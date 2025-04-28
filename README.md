# Apollo247 Clone - Doctor Consultation Platform

A modern web application for booking doctor consultations online, built with Next.js, TypeScript, and MongoDB.

## Features

- **Doctor Search and Filtering**
  - Search doctors by name, specialty, or location
  - Filter by experience, fees, gender, and availability
  - Sort by relevance, experience, fees, and rating

- **Specialty Pages**
  - Dedicated pages for different medical specialties
  - Comprehensive information about each specialty
  - Filtered doctor listings by specialty

- **Responsive Design**
  - Mobile-first approach
  - Tailwind CSS for styling
  - Optimized for all screen sizes

- **Modern Tech Stack**
  - Next.js 14 for server-side rendering
  - TypeScript for type safety
  - MongoDB for database
  - React Query for data fetching
  - Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd doctor-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Seed the database (optional):
   ```bash
   npm run seed
   # or
   yarn seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── doctors/       # Doctor-related API endpoints
│   └── specialties/       # Specialty pages
├── components/            # React components
│   ├── doctor/           # Doctor-related components
│   ├── filters/          # Filter and sort components
│   └── layout/           # Layout components
├── lib/                   # Utility functions and configurations
│   └── db/               # Database connection and models
└── scripts/              # Utility scripts
    └── seed-data.ts      # Database seeding script
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with sample data

## API Endpoints

### Doctors

- `GET /api/doctors/list` - Get list of doctors with filters
  - Query Parameters:
    - `page` - Page number (default: 1)
    - `limit` - Items per page (default: 15)
    - `specialty` - Filter by specialty
    - `location` - Filter by location
    - `gender` - Filter by gender
    - `minExperience` - Minimum years of experience
    - `maxFees` - Maximum consultation fees
    - `availability` - Filter by availability
    - `search` - Search term
    - `sortBy` - Sort field (rating, experience, fees)
    - `sortOrder` - Sort order (asc, desc)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Apollo247
- Built with Next.js and TypeScript
- Styled with Tailwind CSS
