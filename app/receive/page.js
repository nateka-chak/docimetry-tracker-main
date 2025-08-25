"use client";

import { useState } from 'react';
import { Package, Camera, Upload } from 'lucide-react';

export default function Receive() {
  const [activeTab, setActiveTab] = useState('manual');
  const [formData, setFormData] = useState({
    hospital: '',
    receiverName: '',
    receiverTitle: '',
    serialNumbers: ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSerialNumberChange = (index, value) => {
    const newSerialNumbers = [...formData.serialNumbers];
    newSerialNumbers[index] = value;
    setFormData(prev => ({
      ...prev,
      serialNumbers: newSerialNumbers
    }));
  };

  const addSerialNumberField = () => {
    setFormData(prev => ({
      ...prev,
      serialNumbers: [...prev.serialNumbers, '']
    }));
  };

  const removeSerialNumberField = (index) => {
    if (formData.serialNumbers.length > 1) {
      const newSerialNumbers = formData.serialNumbers.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        serialNumbers: newSerialNumbers
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Receipt confirmed successfully! CHAK has been notified.');
      setFormData({
        hospital: '',
        receiverName: '',
        receiverTitle: '',
        serialNumbers: ['']
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    // This would integrate with Tesseract.js for OCR in a real implementation
    const file = e.target.files[0];
    if (file) {
      alert('Image uploaded! In a real implementation, this would extract serial numbers using OCR.');
      // Here you would process the image with Tesseract.js
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-chak-blue mb-6">Confirm Receipt of Dosimetries</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`py-4 px-6 text-center font-medium text-sm flex-1 ${activeTab === 'manual' ? 'text-chak-blue border-b-2 border-chak-blue' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Manual Entry
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`py-4 px-6 text-center font-medium text-sm flex-1 ${activeTab === 'image' ? 'text-chak-blue border-b-2 border-chak-blue' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Image Recognition
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'manual' ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                        Hospital Name
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
                      <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700 mb-1">
                        Receiver's Name
                      </label>
                      <input
                        type="text"
                        id="receiverName"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="receiverTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Receiver's Title
                      </label>
                      <input
                        type="text"
                        id="receiverTitle"
                        name="receiverTitle"
                        value={formData.receiverTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosimetry Serial Numbers
                    </label>
                    
                    {formData.serialNumbers.map((serial, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={serial}
                          onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
                          placeholder={`Serial #${index + 1}`}
                          required
                        />
                        {formData.serialNumbers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSerialNumberField(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addSerialNumberField}
                      className="mt-2 text-chak-blue hover:text-chak-blue-dark text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add another serial number
                    </button>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-chak-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-chak-blue-dark focus:outline-none focus:ring-2 focus:ring-chak-blue-light disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Receipt'}
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Upload images of dosimetries to automatically extract serial numbers</p>
                    <label htmlFor="image-upload" className="bg-chak-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-chak-blue-dark cursor-pointer inline-flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Images
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Ensure the serial numbers are clearly visible in the images for accurate detection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}