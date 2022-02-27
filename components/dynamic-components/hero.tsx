import { ComponentSharedTitle } from 'generated/global/types'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

type Props = {
	data: ComponentSharedTitle
}

const Hero: FC<Props> = ({ data }) => {
	const t = useTranslations('Home')

	return (
		<>
			<h1>Title: {data.title}</h1>
			<p>Content: {data.content}</p>
			<h3>Locale: {t('hello')}</h3>
		</>
	)
}

export default Hero
