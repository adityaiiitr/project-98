import Link from "next/link";

const Header = () => {
    return (
        <header className="flex items-center justify-between w-full px-8 py-4 bg-primary">
        <Link href={'/'}><h3 className="text-xl font-bold text-white">Vahan</h3></Link>
        </header>
    );
    }

export default Header;