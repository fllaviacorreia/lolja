import Link from "next/link"

export default function Header(){
    return(
        <header className="p-2">
            <nav className="bg-cl4 justify-center items-center flex flex-row rounded-xl h-14 text-cl1">
                <ul className="flex">
                    <li className="mr-20 rounded-lg w-20 text-center">
                        <Link href={"/"}>Home</Link>
                    </li>

                    <li className="mr-20 rounded-lg w-20 text-center">
                        <Link href={"/clientes"}>Clientes</Link>
                    </li>

                    <li className="mr-20 rounded-lg w-20 text-center">
                        <Link href={"/compras"}>Compras</Link>
                    </li>

                    <li className="mr-20 rounded-lg w-20 text-center">
                        <Link href={"/produtos"}>Produtos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}