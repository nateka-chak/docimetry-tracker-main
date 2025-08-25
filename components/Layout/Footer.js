export default function Footer() {
  return (
    <footer className="chak-gradient text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">CHAK Dosimetry Tracker</h3>
            <p className="text-sm opacity-80">Christian Health Association of Kenya</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:underline">Terms of Service</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Christian Health Association of Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}