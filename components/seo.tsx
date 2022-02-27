import { NextSeo } from 'next-seo'

export interface mediaPropTypes {
	id: string | number
	alternativeText: string
	mime: string
	url: string
	formats: {
		url: string
		width: string
		height: string
	}[]
}

interface MetaData {
	metaTitle: string
	metaDescription: string
	shareImage?: mediaPropTypes
	twitterCardType?: string
	twitterUsername?: string
}

type Meta = {
	metadata: MetaData
}

const Seo = ({ metadata }: Meta) => {
	// Prevent errors if no metadata was set
	if (!metadata) return null

	return (
		<NextSeo
			title={metadata.metaTitle}
			description={metadata.metaDescription}
			openGraph={{
				type: 'website',
				// Title and description are mandatory
				title: metadata.metaTitle,
				description: metadata.metaDescription,
				// Only include OG image if we have it
				// Careful: if you disable image optimization in Strapi, this will break
				// images: Object.values(metadata?.shareImage?.formats).map((image) => {
				// 	return {
				// 		url: getStrapiMedia(image?.url),
				// 		width: image?.width,
				// 		height: image?.height,
				// 	}
				// }),
			}}
			// Only included Twitter data if we have it
			twitter={{
				...(metadata.twitterCardType && { cardType: metadata.twitterCardType }),
				// Handle is the twitter username of the content creator
				...(metadata.twitterUsername && { handle: metadata.twitterUsername }),
			}}
		/>
	)
}

export default Seo
