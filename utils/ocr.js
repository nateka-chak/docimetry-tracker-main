import Tesseract from 'tesseract.js';

export const extractSerialNumbers = async (imageFile) => {
  try {
    const { data } = await Tesseract.recognize(
      imageFile,
      'eng',
      { logger: m => console.log(m) }
    );
    
    // Extract potential serial numbers from recognized text
    const text = data.text;
    const lines = text.split('\n');
    
    // Look for patterns that might be serial numbers
    // This regex looks for strings that might be serial numbers
    const serialNumberRegex = /[A-Z0-9]{4,}[-]?[A-Z0-9]{4,}/g;
    const potentialSerials = [];
    
    lines.forEach(line => {
      const matches = line.match(serialNumberRegex);
      if (matches) {
        potentialSerials.push(...matches);
      }
    });
    
    return potentialSerials.length > 0 ? potentialSerials : ['No serial numbers detected'];
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to process image');
  }
};

export const validateSerialNumber = (serial) => {
  // Basic validation - adjust based on your serial number format
  const serialRegex = /^[A-Z0-9]{4,}[-]?[A-Z0-9]{4,}$/;
  return serialRegex.test(serial);
};