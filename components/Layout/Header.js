import Link from 'next/link';

export default function Header() {
  return (
    <header className="chak-gradient text-chak-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="bg-chak-white p-2 rounded-full">
                <img src="/images/logo.png" alt="CHAK Logo" className="h-3 w-3" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CHAK Dosimetry Tracker</h1>
                <p className="text-sm opacity-80">Christian Health Association of Kenya</p>
              </div>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/dashboard">
              <span className="hover:underline cursor-pointer">Dashboard</span>
            </Link>
            <Link href="/dispatch">
              <span className="hover:underline cursor-pointer">Dispatch</span>
            </Link>
            <Link href="/receive">
              <span className="hover:underline cursor-pointer">Receive</span>
            </Link>
            <Link href="/shipments">
              <span className="hover:underline cursor-pointer">Shipments</span>
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button className="text-chak-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}