import Link from 'next/link'
const Nav = ({ pages }: { pages: { slug: string; title: string }[] }) => {
	return (
		<nav>
			<Link href={`/`}>
				<a>HOME</a>
			</Link>
			{pages.map((page) => (
				<Link href={`/${page.slug}`} key={page.slug}>
					<a>{page?.title}</a>
				</Link>
			))}
		</nav>
	)
}

export default Nav
