import { GetStaticProps, NextPage, InferGetStaticPropsType, GetStaticPropsContext } from 'next'
import { getPageData } from 'utils/api'
import { Layout } from '@components/common/Layout'
import DynamicZoneSections from '@components/DynamicZoneSections'
import LocaleSwitch from '@components/locale-switch'
import { getLocalizedPaths, LocalizedPathsType } from 'utils/localize'
import Seo from '@components/seo'
import { initializeApollo } from '@lib/apolloClient'
import { GetPagesDocument, GetPagesQuery } from '../graphql/queries/__generated__/getPages'
import { PageEntity, Page } from 'generated/global/types'

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage: NextPage = ({ pageContext }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<Layout pageContext={pageContext}>
			{/* Add meta tags for SEO*/}
			<Seo
				metadata={{
					metaTitle: 'Meta Title',
					metaDescription: 'Meta Desc',
				}}
			/>
			{/* Display localized page */}
			{pageContext?.localizedPaths ? <LocaleSwitch localizedPaths={pageContext.localizedPaths} /> : null}
			{/* Display content sections */}
			{pageContext?.dynamicZone ? <DynamicZoneSections dynamicZones={pageContext.dynamicZone} /> : null}
		</Layout>
	)
}

export default DynamicPage

const client = initializeApollo()
export const getStaticPaths = async (context: GetStaticPropsContext) => {
	// Get all pages from Strapi
	const allPages = context.locales
		? (context.locales.map(async (locale: string) => {
				const {
					data: { pages },
				} = await client.query<GetPagesQuery>({ query: GetPagesDocument, variables: { locale } })
				return pages?.data
		  }) as PageEntity[])
		: []

	const pages = await (await Promise.all(allPages)).flat()

	const paths = pages.map(({ attributes }) => {
		// Decompose the slug that was saved in Strapi
		const { slug, locale } = attributes as Page
		const slugArray = !slug ? false : slug.split('/')

		return {
			params: { slug: slugArray },
			// Specify the locale to render
			locale,
		}
	})

	return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	const { params, locale, locales, defaultLocale } = context

	// Fetch pages. Include drafts if preview mode is on
	const pageData = await getPageData({ slug: !params?.slug ? [''] : (params.slug as string[]) }, locale || '')

	if (pageData == null) {
		// Giving the page no props will trigger a 404 page
		return { props: {} }
	}

	// We have the required page data, pass it to the page component
	const { title, slug, description, content, dynamicZone } = pageData.attributes as Page

	const pageContext = {
		locale,
		locales,
		defaultLocale,
		slug,
		description,
		title,
		content,
		dynamicZone,
	}

	const localizedPaths: LocalizedPathsType[] = getLocalizedPaths(pageContext)

	return {
		props: {
			pageContext: {
				...pageContext,
				localizedPaths,
			},
			messages: require(`locales/${locale}.json`),
		},
		revalidate: 10,
	}
}
