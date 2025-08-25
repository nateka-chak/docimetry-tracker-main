# CHAK Dosimetry Tracker

A comprehensive web application for tracking dosimetry equipment from dispatch to delivery for the Christian Health Association of Kenya.

## Features

- Real-time tracking of dosimetry shipments
- Dispatch management with serial number tracking
- Hospital receipt confirmation with manual or image-based entry
- Automatic notifications to CHAK when dosimetries are received
- Modern, responsive design with Tailwind CSS
- Dark blue and white color scheme matching CHAK's branding

## Technology Stack

- Next.js 12
- React 18
- Tailwind CSS
- MySQL (via mysql2)
- Tesseract.js for OCR functionality

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MySQL database using the provided schema
4. Configure environment variables in `.env.local`
5. Run the development server: `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

See the `database-schema.sql` file for the complete database structure.

## Deployment

To deploy to cPanel:

1. Build the project: `npm run build`
2. Export as static site: `npm run export` (if using static export)
3. Upload the `out` folder to your cPanel public_html directory

## Usage

### For CHAK Staff:

1. Use the Dispatch page to record outgoing dosimetries
2. Monitor shipments on the Dashboard or Shipments page
3. Receive notifications when hospitals confirm receipt

### For Hospitals:

1. Use the Receive page to confirm receipt of dosimetries
2. Enter serial numbers manually or upload images for automatic detection
3. Submit the form to notify CHAK of successful receipt

## License

This project is proprietary software developed for Christian Health Association of Kenya.