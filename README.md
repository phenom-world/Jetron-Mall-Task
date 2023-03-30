## Jetron Mall 2023 Q1 Fullstack Developer Take Home Assignment

Building a full-stack application using NextJS, tRPC, TailwindCSS, and Prisma. The application is a simple inventory management system that allows users to create, update, delete, and view products.

### Technology Stack

- NextJS - A React-based framework for building server-side rendered web applications.
- tRPC - A TypeScript-based RPC framework for building APIs.
- TailwindCSS - A utility-first CSS framework for building responsive web applications.
- Prisma - A database ORM for building type-safe queries and migrations.

## Getting Started

To get started with this project, you'll need to follow these steps:

- Clone the repository: git clone <repository-url>
- Install the dependencies: npm install
- Set up the database: update the env variable as added in the .env.example file
- ``npx prisma migrate dev` to run prisma migrations
- Start the development server: npm run dev

## Functionality
The inventory management system has the following functionality:

- Ability to create a Product: Users can create a new product by filling out a form with the product's name, description, and whether it should be hidden or not.
- Ability to update a Product: Users can update an existing product by clicking the "Edit" button on the product details page and making changes to the form.
- Ability to delete a Product: Users can delete an existing product by clicking the "Delete" button on the product details page.
- Ability to view Products and view a specific product: Users can view a list of all products on the home page, and view the details of a specific product by clicking on its name.
- Ability to hide a Product: Users can hide a product by setting the "isHidden" field to true.


## Database Structure
The database structure for the product table includes the following fields:

id (ID) - The unique identifier for the product.
name (String) - The name of the product.
description (String) - A description of the product.
isHidden (Boolean) - Whether the product should be hidden or not.
createdAt (Date) - The date and time that the product was created.

## Project Structure
The project has the following file structure:

├── components
│ ├── Layout.tsx
│ ├── ProductForm.tsx
│ ├── ProductList.tsx
│ └── ProductListItem.tsx
├── pages
│ ├── api
│ │ └── products.ts
│ ├── product
│ │ ├── [id].tsx
│ │ └── index.tsx
│ └── index.tsx
├── prisma
│ ├── schema.prisma
│ └── seeds.ts
├── styles
│ ├── globals.css
│ └── tailwind.css
├── trpc
│ ├── client.ts
│ └── server.ts
├── types
│ └── prisma.ts
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package-lock.json
├── package.json
└── README.md

- components: Contains reusable React components that are used throughout the application.
- pages: Contains the NextJS pages that make up the user interface.
- prisma: Contains the Prisma schema and seed data.
- styles: Contains the global CSS styles and TailwindCSS configuration.
- trpc: Contains the tRPC client and server code.
- types: Contains type definitions for Prisma.
