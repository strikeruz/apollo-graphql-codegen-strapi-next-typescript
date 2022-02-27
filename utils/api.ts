import { initializeApollo } from '@lib/apolloClient'
import { PageEntity } from 'generated/global/types';
import { GetPageDocument, GetPageQuery } from './../graphql/queries/__generated__/getPage';

const client = initializeApollo()

export const getPageData = async (params: {slug: string[]}, locale: string) : Promise<PageEntity | null> => {
	const slug = params.slug.join('/')

	// Find the pages that match this slug
	// const pagesData = await fetchAPI(`/pages?slug=${slug}&locale=${locale}&status=published&populate=*${preview ? '&status=draft' : ''}`)
	const {
		data: { pages },
	} = await client.query<GetPageQuery>({ query: GetPageDocument, variables: { locale, slug } })

	// Make sure we found something, otherwise return null
	if (!pages) {
		return null
	}

	// Return the first item since there should only be one result per slug
	return pages?.data[0] as PageEntity
}
