import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Securonixs</a>
        </Link>

        <Link href="/new">
            <a className="create">Take Assesment</a>
        </Link>
    </nav>
)

export default Navbar;