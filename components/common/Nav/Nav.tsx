import Link from 'next/link'
const Nav = ({ pages }: { pages: { slug: string; title: string }[] }) => {
	return (
		<nav>
			{pages.map((page) => (
				<Link href={`${page.slug}`} key={page.slug} passHref>
					<a>{page?.title}</a>
				</Link>
			))}
		</nav>
	)
}

export default Nav
