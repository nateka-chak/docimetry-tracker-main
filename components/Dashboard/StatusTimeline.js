import { CheckCircle, Clock, Truck, Package } from 'lucide-react';

export default function StatusTimeline({ status, dispatchDate, estimatedDelivery, receivedDate }) {
  const statusSteps = [
    { key: 'dispatched', label: 'Dispatched', icon: Package },
    { key: 'in_transit', label: 'In Transit', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const currentStatusIndex = statusSteps.findIndex(step => step.key === status);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-chak-blue mb-4">Shipment Status</h3>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
        
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const IconComponent = step.icon;
          
          return (
            <div key={step.key} className="relative flex items-start mb-8 last:mb-0">
              {/* Status Icon */}
              <div className={`rounded-full p-2 z-10 ${
                isCompleted ? 'bg-green-500 text-white' : 
                isCurrent ? 'bg-chak-blue text-white' : 
                'bg-gray-200 text-gray-500'
              }`}>
                <IconComponent className="h-5 w-5" />
              </div>

              {/* Label + Dates */}
              <div className="ml-4">
                <p className={`font-medium ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
                {step.key === 'dispatched' && dispatchDate && (
                  <p className="text-sm text-gray-500">Dispatched on {dispatchDate}</p>
                )}
                {step.key === 'in_transit' && estimatedDelivery && (
                  <p className="text-sm text-gray-500">ETA: {estimatedDelivery}</p>
                )}
                {step.key === 'delivered' && receivedDate && (
                  <p className="text-sm text-gray-500">Received on {receivedDate}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
