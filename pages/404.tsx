import type { NextPage } from 'next'
import { Layout } from '@components/common/Layout'
import { Alert, AlertTitle } from '@mui/material'

const NotFoundPage: NextPage = () => {
	return (
		<Layout>
			<Alert severity='error'>
				<AlertTitle>404. Page not found</AlertTitle>
				Sorry, we couldn&apos;t find this page.
			</Alert>
		</Layout>
	)
}

export default NotFoundPage
