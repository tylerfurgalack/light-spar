# Light-Spar

Light-Spar is a web application built with React that allows users to filter and view profiles of fighters based on their location and weight class.

## Features

- View a list of fighter profiles
- Filter profiles by location and weight class
- Autocomplete location input with Google Places API
- Reset filters to show all profiles

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm or yarn
- PostgreSQL

### Steps

1. Clone the repository:

   `git clone https://github.com/yourusername/Light-Spar.git`

2. Navigate to the project directory:
   `cd Light-Spar`

3. Install the dependencies:

With npm:

`npm install`
Or with yarn:

`yarn install`

4. Navigate to the server directory:

`cd server`

5. Create a PostgreSQL database for the application.

Copy the `.env.example` file to a new file named `.env` and fill in your database details.

7. Run the database migrations:

With npm:

`npm run knex migrate:latest`

Or with yarn:

`yarn knex migrate:latest`

8. Seed the database:

With npm:

`npm run knex seed:run`

Or with yarn:

`yarn knex seed:run`

9. Navigate back to the root directory:

`cd ..`

10. Start the application:

With npm:

`npm start`

Or with yarn:

`yarn start`

## Usage

1. Navigate to the Users List page to view all profiles.
2. Enter a location in the location input field. As you type, you'll see a dropdown of locations from the Google Places API. Select a location from the dropdown to filter profiles by this location.
3. Enter a weight class in the weight class input field to filter profiles by this weight class.
4. Click the "Reset" button to clear the filters and show all profiles.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
