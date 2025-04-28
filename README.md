# Apollo247 Clone - Doctor Listing

This is a clone of the Apollo247 doctor listing page built with Next.js and MongoDB. The application includes a doctor listing page with filtering, sorting, and pagination capabilities.

## Features

- Doctor listing with detailed information
- Filtering by specialty, location, gender, experience, and fees
- Pagination for browsing through doctor lists
- Responsive design for mobile and desktop
- RESTful API for doctor data management
- SEO optimized with metadata

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/apollo247-clone.git
   cd apollo247-clone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/apollo_clone
   ```

4. Seed the database with sample data:
   ```
   npm run seed
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

### 1. Add Doctor
- **URL**: `/api/doctors/add`
- **Method**: `POST`
- **Description**: Creates a new doctor entry in the database
- **Request Body**: Doctor information

### 2. List Doctors
- **URL**: `/api/doctors/list`
- **Method**: `GET`
- **Description**: Retrieves doctors with filtering and pagination
- **Query Parameters**:
  - `page`: Page number for pagination
  - `limit`: Number of doctors per page
  - `specialty`: Filter by specialty
  - `location`: Filter by location
  - `gender`: Filter by gender (male/female)
  - `minExperience`: Filter by minimum years of experience
  - `maxFees`: Filter by maximum consultation fees
  - `availability`: Filter by availability (true/false)
  - `search`: Search by name or qualifications
  - `sortBy`: Field to sort by
  - `sortOrder`: Sort direction (asc/desc)

## Project Structure

```
/
├── public/                  # Static files
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes
│   │   │   └── doctors/     # Doctor API endpoints
│   │   └── specialties/     # Doctor listing pages
│   ├── components/          # React components
│   │   ├── doctor/          # Doctor-related components
│   │   ├── filters/         # Filter components
│   │   └── layout/          # Layout components
│   ├── lib/                 # Utility functions
│   │   ├── db/              # Database connections
│   │   └── services/        # API services
│   ├── models/              # Mongoose models
│   └── scripts/             # Database scripts
└── package.json
```

## License

This project is for educational purposes only. It is not affiliated with Apollo247 in any way.

## Acknowledgements

- [Apollo247](https://www.apollo247.com/) for the original design and inspiration.
