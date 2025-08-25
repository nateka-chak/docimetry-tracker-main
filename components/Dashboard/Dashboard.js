import { Truck, Package, CheckCircle, Clock } from 'lucide-react';

export default function Dashboard({ shipments = [] }) {
  // Calculate statistics
  const stats = {
    total: shipments.length,
    dispatched: shipments.filter(s => s.status === 'dispatched').length,
    inTransit: shipments.filter(s => s.status === 'in_transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 card-hover">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm text-gray-500">Total Shipments</h3>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 card-hover">
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
        
        <div className="bg-white rounded-lg shadow-md p-6 card-hover">
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
        
        <div className="bg-white rounded-lg shadow-md p-6 card-hover">
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
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-chak-blue mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/dispatch" 
            className="bg-chak-blue text-white p-4 rounded-lg text-center hover:bg-chak-blue-dark transition-colors"
          >
            <Truck className="h-8 w-8 mx-auto mb-2" />
            <span>Dispatch New Shipment</span>
          </a>
          <a 
            href="/receive" 
            className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
            <span>Confirm Receipt</span>
          </a>
          <a 
            href="/shipments" 
            className="bg-gray-600 text-white p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
          >
            <Package className="h-8 w-8 mx-auto mb-2" />
            <span>View All Shipments</span>
          </a>
        </div>
      </div>
    </div>
  );
}