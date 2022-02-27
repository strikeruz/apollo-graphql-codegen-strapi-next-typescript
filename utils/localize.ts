import { GetStaticPropsContext } from 'next'

interface ILocalizePath extends GetStaticPropsContext {
  slug?: string
}

export type LocalizedPathsType = {
  locale: string;
  href: string
}

export function localizePath(pageContext: ILocalizePath) {
  const { locale, defaultLocale, slug } = pageContext

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return slug ? `/${slug}` : '/'
  }

  // The slug should have a localePrefix
  return slug ? `/${locale}/${slug}` : `/${locale}`
}

export function getLocalizedPaths(pageContext: GetStaticPropsContext): LocalizedPathsType[] {
  const paths = pageContext?.locales?.map((locale: string) => {
    return {
      locale,
      href: localizePath({ ...pageContext, locale }),
    }
  }) as []

  return paths
}
