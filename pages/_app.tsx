import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../config/theme'
import createEmotionCache from '../config/createEmotionCache'
import { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apolloClient'
import { IntlError, IntlErrorCode, NextIntlProvider } from 'next-intl'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface CustomAppProps extends AppProps {
	emotionCache?: EmotionCache
}

function onError(error: IntlError) {
	if (process.env.NODE_ENV !== 'production') {
		if (error.code === IntlErrorCode.MISSING_MESSAGE) {
			console.warn(error)
		} else {
			console.error(error)
		}
	}
}

function getMessageFallback({ namespace, key, error }: { namespace: string; key: string; error: IntlError }) {
	const path = [namespace, key].filter((part) => part != null).join('.')

	if (error.code === IntlErrorCode.MISSING_MESSAGE) {
		return `${path} is not yet translated`
	}
	return `Fix translation message at: ${path}`
}

const App: NextPage<CustomAppProps> = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
	const apolloClient = useApollo(pageProps)

	return (
		<ApolloProvider client={apolloClient}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name='viewport' content='initial-scale=1, width=device-width' />
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<NextIntlProvider messages={pageProps.messages} onError={onError} getMessageFallback={getMessageFallback}>
						<Component {...pageProps} />
					</NextIntlProvider>
				</ThemeProvider>
			</CacheProvider>
		</ApolloProvider>
	)
}

export default App
