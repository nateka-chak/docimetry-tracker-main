"use client";

import { useState } from 'react';
import ImageUpload from './ImageUpload';

export default function ReceiveForm({ onSubmit }) {
  const [serialNumbers, setSerialNumbers] = useState(['']);
  const [hospitalName, setHospitalName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [useImageRecognition, setUseImageRecognition] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSerialNumber = () => {
    setSerialNumbers([...serialNumbers, '']);
  };

  const handleSerialNumberChange = (index, value) => {
    const newSerialNumbers = [...serialNumbers];
    newSerialNumbers[index] = value;
    setSerialNumbers(newSerialNumbers);
  };

  const handleRemoveSerialNumber = (index) => {
    if (serialNumbers.length > 1) {
      const newSerialNumbers = serialNumbers.filter((_, i) => i !== index);
      setSerialNumbers(newSerialNumbers);
    }
  };

  const handleImageUpload = (detectedNumbers) => {
    setSerialNumbers(detectedNumbers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        hospitalName,
        receiverName,
        serialNumbers: serialNumbers.filter(num => num.trim() !== '')
      });
      
      // Reset form
      setHospitalName('');
      setReceiverName('');
      setSerialNumbers(['']);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-chak-blue mb-6">Receive Dosimetries</h2>
      
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={useImageRecognition}
            onChange={() => setUseImageRecognition(!useImageRecognition)}
            className="rounded text-chak-blue focus:ring-chak-blue"
          />
          <span className="ml-2 text-gray-700">Use image recognition to extract serial numbers</span>
        </label>
      </div>
      
      {useImageRecognition ? (
        <ImageUpload onNumbersDetected={handleImageUpload} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="hospitalName">
              Hospital Name
            </label>
            <input
              type="text"
              id="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="receiverName">
              Receiver's Name
            </label>
            <input
              type="text"
              id="receiverName"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Dosimetry Serial Numbers</label>
            {serialNumbers.map((serialNumber, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chak-blue"
                  placeholder={`Serial #${index + 1}`}
                />
                {serialNumbers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSerialNumber(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSerialNumber}
              className="mt-2 text-chak-blue hover:text-chak-blue-dark flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add another serial number
            </button>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-chak-blue text-white py-3 px-4 rounded-lg hover:bg-chak-blue-dark focus:outline-none focus:ring-2 focus:ring-chak-blue-light disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Receipt'}
          </button>
        </form>
      )}
    </div>
  );
}