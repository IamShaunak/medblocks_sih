import Navbar from "../../src/components/Navbar";

export default function Home() {
  return (
    <div>
    <Navbar />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-gray-100 p-8">
            <header className="text-4xl font-semibold mb-4">Welcome to MedBlocks</header>
            <section>
                <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                <p>Empowering healthcare professionals and improving patient care through decentralized governance.</p>
            </section>
            <section>
                <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
                <ul className="list-disc pl-6">
                    <li>Enhanced hospital management</li>
                    <li>Optimized staffing</li>
                    <li>Improved patient experience</li>
                    {/* Add more benefits here */}
                </ul>
            </section>
        </div>
    </main>
    </div>
  )
}
