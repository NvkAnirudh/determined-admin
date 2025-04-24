# Data Submission Portal

## Project Overview

This repository contains a web application that serves as a data submission portal for a data engineering project showcase platform. The website features two forms that allow users to submit information, which is then stored in a Supabase database.

The submitted data is later retrieved and displayed by the main application that curates data engineering questions and showcases projects.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

## Local Development

To work on this project locally, follow these steps:

```sh
# Step 1: Clone the repository
git clone https://github.com/NvkAnirudh/determined-admin.git

# Step 2: Navigate to the project directory
cd determined-admin

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Project Structure

- `src/`: Contains the source code for the application
  - `components/`: UI components used throughout the application
  - `integrations/supabase/`: Supabase client setup and type definitions
  - `pages/`: Main pages of the application including the form pages
  - `hooks/`: Custom React hooks
  - `lib/`: Utility libraries and functions
  - `utils/`: Helper functions

## Deployment

The application can be deployed to any static site hosting service that supports React applications built with Vite.

## Database Integration

The application connects to a Supabase database where form submissions are stored. The main data engineering application then fetches this data to display on its platform.

## Contributing

To contribute to this project:

1. Clone the repository
2. Create a new branch for your feature or fix
3. Make your changes
4. Submit a pull request

## License

[Specify your license information here]
