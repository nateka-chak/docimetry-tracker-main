import { useState } from 'react';
import { Plus, X, Truck } from 'lucide-react';
import Button from '../UI/Button';
import Loader from '../UI/Loader';

export default function DispatchForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    hospital: '',
    address: '',
    contactPerson: '',
    contactPhone: '',
    dosimetries: ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDosimetryChange = (index, value) => {
    const newDosimetries = [...formData.dosimetries];
    newDosimetries[index] = value;
    setFormData(prev => ({
      ...prev,
      dosimetries: newDosimetries
    }));
  };

  const addDosimetryField = () => {
    setFormData(prev => ({
      ...prev,
      dosimetries: [...prev.dosimetries, '']
    }));
  };

  const removeDosimetryField = (index) => {
    if (formData.dosimetries.length > 1) {
      const newDosimetries = formData.dosimetries.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        dosimetries: newDosimetries
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        dosimetries: formData.dosimetries.filter(d => d.trim() !== '')
      });
      
      // Reset form
      setFormData({
        hospital: '',
        address: '',
        contactPerson: '',
        contactPhone: '',
        dosimetries: ['']
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-chak-blue mb-6">Dispatch Dosimetries</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Name *
            </label>
            <input
              type="text"
              id="hospital"
              name="hospital"
              value={formData.hospital}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
              required
            />
          </div>
          
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person *
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
              required
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone *
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Dosimetry Serial Numbers *
            </label>
            <button
              type="button"
              onClick={addDosimetryField}
              className="flex items-center text-chak-blue hover:text-chak-blue-dark text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Another
            </button>
          </div>
          
          {formData.dosimetries.map((serial, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={serial}
                onChange={(e) => handleDosimetryChange(index, e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
                placeholder={`Serial #${index + 1}`}
                required
              />
              {formData.dosimetries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDosimetryField(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader size="small" className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Truck className="h-4 w-4 mr-2" />
                Dispatch Now
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}