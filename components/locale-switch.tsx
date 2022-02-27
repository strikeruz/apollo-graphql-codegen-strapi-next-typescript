import { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { LocalizedPathsType } from '@utils/localize'

type Props = {
	localizedPaths: LocalizedPathsType[]
}
const LocaleSwitch: FC<Props> = ({ localizedPaths }) => {
	const router = useRouter()
	const [locale, setLocale] = useState<string | null>()

	const handleLocaleChange = async (selectedLocale: string) => {
		// Persist the user's language preference
		// https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
		Cookies.set('NEXT_LOCALE', selectedLocale)
		setLocale(selectedLocale)
	}

	useEffect(() => {
		const localeCookie = Cookies.get('NEXT_LOCALE')
		setLocale(localeCookie || router.locale)
	}, [locale, router, localizedPaths])

	return (
		<>
			{localizedPaths &&
				localizedPaths.map(({ href, locale }) => {
					return (
						<Link href={href} key={locale} locale={locale} passHref>
							<a style={{ color: router.locale === locale ? 'red' : 'black' }} onClick={() => handleLocaleChange(locale)}>
								{locale}
							</a>
						</Link>
					)
				})}
		</>
	)
}

export default LocaleSwitch
