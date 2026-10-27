# RentNest

RentNest is a rental property management backend with three roles: tenants, landlords, and admins. Tenants can browse and search rental properties, submit rental requests, and make online payments. Landlords can create and manage their property listings and approve or reject rental requests for their own properties. Admins can manage users, property categories, and oversee the platform. The system also integrates Stripe for online payments.

## Features

- **Authentication & Authorization:** JWT-based authentication with role-based access for tenants, landlords, and admins.
- **Property Management:** Create, update, delete, and browse rental properties.
- **Search & Filtering:** Search properties by price and amenities with pagination support.
- **Category Management:** Organize rental properties by categories.
- **Rental Requests:** Tenants can request properties, and landlords can approve or reject requests for their own properties.
- **Payment Integration:** Stripe Checkout for online payments.
- **Payment Management:** Store payment records and track payment status.
- **Validation & Error Handling:** Validate inputs and handle API errors.
- **API Testing:** Test endpoints using Postman.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- bcryptjs
- Stripe
- Postman
- Vercel

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sumaiyakhondoker/RentNest.git
   ```

2. Navigate to the project directory:

   ```bash
   cd RentNest
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the required environment variables, including your database connection, JWT secret, and Stripe credentials.

5. Generate the Prisma Client and run the required database migrations according to the project's Prisma configuration.

6. Start the development server:

   ```bash
   npm run dev
   ```

## API Testing

You can test the API endpoints using Postman. Postman-related resources are available in the `RentNest.postman_collection.json` directory.

## Live Project

- **Live URL:** https://rent-nest-rose.vercel.app/
- **GitHub Repository:** https://github.com/sumaiyakhondoker/RentNest

## Author

**Sumaiya Khondoker Nabila**

- GitHub: https://github.com/sumaiyakhondoker
