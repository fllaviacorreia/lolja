import Header from "./componentes/header";
import Footer from "./componentes/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <section className="flex flex-grow pt-16 items-center justify-center flex-col w-screen">
          <h1 className="text-black text-xl">Welcome to</h1>
          <h1 className="text-cl3 font-black text-6xl">Lolja</h1>
        </section>
      <Footer />
    </div>
  )
}
