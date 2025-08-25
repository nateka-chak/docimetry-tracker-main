import Link from 'next/link'
import { Truck, Hospital, Shield, Bell } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* <main className="flex-grow"> */}
        {/* Hero Section */}
        <section className="chak-gradient text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Track Dosimetries with Precision</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              A comprehensive solution for managing and tracking dosimetry equipment from dispatch to delivery
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/dashboard">
                <button className="bg-white text-chak-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Go to Dashboard
                </button>
              </Link>
              <Link href="/dispatch">
                <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors">
                  Dispatch Items
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-chak-blue mb-12">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg shadow-md card-hover">
                <div className="bg-chak-blue rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Truck className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Monitor the status of your dosimetries from dispatch to delivery with live updates
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg shadow-md card-hover">
                <div className="bg-chak-blue rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Hospital className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hospital Portal</h3>
                <p className="text-gray-600">
                  Easy receipt confirmation for hospitals with automated notifications to CHAK
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg shadow-md card-hover">
                <div className="bg-chak-blue rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Notifications</h3>
                <p className="text-gray-600">
                  Get notified immediately when dosimetries are received by hospitals
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-chak-blue mb-12">How It Works</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              <div className="text-center flex-1">
                <div className="bg-chak-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Dispatch</h3>
                <p className="text-gray-600">
                  CHAK dispatches dosimetries with serial numbers and records them in the system
                </p>
              </div>
              
              <div className="text-center flex-1">
                <div className="bg-chak-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">In Transit</h3>
                <p className="text-gray-600">
                  Track the shipment status in real-time as it moves toward the destination
                </p>
              </div>
              
              <div className="text-center flex-1">
                <div className="bg-chak-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Receive</h3>
                <p className="text-gray-600">
                  Hospital confirms receipt by entering serial numbers or uploading images
                </p>
              </div>
              
              <div className="text-center flex-1">
                <div className="bg-chak-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">4</div>
                <h3 className="text-xl font-semibold mb-2">Notification</h3>
                <p className="text-gray-600">
                  CHAK receives instant notification with all details of the received dosimetries
                </p>
              </div>
            </div>
          </div>
        </section>
      {/* </main> */}
    </>
  )
}