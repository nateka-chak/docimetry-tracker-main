import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Truck, Package, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    dispatched: 0,
    inTransit: 0,
    delivered: 0
  });

  const [recentShipments, setRecentShipments] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      total: 1245,
      dispatched: 342,
      inTransit: 56,
      delivered: 847
    });

    setRecentShipments([
      { id: 1, hospital: 'Nairobi Hospital', status: 'in_transit', items: 12, date: '2023-10-15' },
      { id: 2, hospital: 'Kenyatta National', status: 'delivered', items: 8, date: '2023-10-14' },
      { id: 3, hospital: 'Mater Hospital', status: 'dispatched', items: 5, date: '2023-10-13' },
      { id: 4, hospital: 'Aga Khan Hospital', status: 'in_transit', items: 15, date: '2023-10-12' }
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'dispatched': return <Package className="h-5 w-5 text-blue-500" />;
      case 'in_transit': return <Truck className="h-5 w-5 text-yellow-500" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'dispatched': return <span className="status-dispatched">Dispatched</span>;
      case 'in_transit': return <span className="status-transit">In Transit</span>;
      case 'delivered': return <span className="status-delivered">Delivered</span>;
      default: return <span className="status-pending">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard - CHAK Dosimetry Tracker</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-chak-blue mb-6">Dashboard Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Total Dosimetries</h3>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">In Transit</h3>
                <p className="text-2xl font-bold">{stats.inTransit}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Delivered</h3>
                <p className="text-2xl font-bold">{stats.delivered}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-gray-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm text-gray-500">Dispatched</h3>
                <p className="text-2xl font-bold">{stats.dispatched}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Shipments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-chak-blue mb-4">Recent Shipments</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentShipments.map(shipment => (
                  <tr key={shipment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-chak-blue rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{shipment.hospital.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{shipment.hospital}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(shipment.status)}
                        <div className="ml-2">
                          {getStatusText(shipment.status)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shipment.items} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shipment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-chak-blue hover:text-chak-blue-dark mr-3">View</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-end">
            <a href="/shipments" className="text-chak-blue hover:text-chak-blue-dark font-semibold">
              View all shipments →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}