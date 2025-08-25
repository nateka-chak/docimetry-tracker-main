import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { extractSerialNumbers } from '../../utils/ocr';
import Button from '../UI/Button';
import Loader from '../UI/Loader';

export default function ImageUpload({ onNumbersDetected }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [detectedNumbers, setDetectedNumbers] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsProcessing(true);
    const newUploadedImages = [...uploadedImages];
    const allDetectedNumbers = [...detectedNumbers];

    try {
      for (const file of files) {
        const serials = await extractSerialNumbers(file);
        newUploadedImages.push({
          file,
          preview: URL.createObjectURL(file),
          detectedSerials: serials
        });
        allDetectedNumbers.push(...serials);
      }

      setUploadedImages(newUploadedImages);
      setDetectedNumbers([...new Set(allDetectedNumbers)]); // Remove duplicates
      onNumbersDetected([...new Set(allDetectedNumbers)]);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Failed to process images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeImage = (index) => {
    const newUploadedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newUploadedImages);
    
    // Recalculate detected numbers
    const newDetectedNumbers = newUploadedImages.flatMap(img => img.detectedSerials);
    setDetectedNumbers([...new Set(newDetectedNumbers)]);
    onNumbersDetected([...new Set(newDetectedNumbers)]);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-chak-blue transition-colors"
        onClick={triggerFileInput}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader size="large" className="mb-4" />
            <p className="text-gray-500">Processing images...</p>
          </div>
        ) : (
          <>
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Click to upload images of dosimetries</p>
            <Button variant="outline" className="inline-flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Select Images
            </Button>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
          disabled={isProcessing}
        />
      </div>

      {uploadedImages.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.preview}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {detectedNumbers.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Detected Serial Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {detectedNumbers.map((number, index) => (
              <div key={index} className="bg-white px-3 py-2 rounded border text-sm">
                {number}
              </div>
            ))}
          </div>
        </div>
      )}

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
              Well-lit, focused images work best.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}