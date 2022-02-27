import { Footer } from '../Footer'
import { Header } from '../Header'
import { Nav } from '../Nav'

type Props = {
	children: React.ReactNode
	pageContext?: any
	navigation?: any
}

const Layout = ({ children, pageContext, navigation }: Props) => {
	return (
		<>
			<Header />
			{navigation && <Nav pages={navigation.pages} />}
			<main>{children}</main>
			{navigation && <Footer pages={navigation.pages} />}
		</>
	)
}

export default Layout
