

# EduCase Assignment - School Location API

## Overview

This project provides an API that allows users to get a list of schools sorted by their distance from a given location (latitude and longitude). The API uses the `geolib` library to calculate distances between coordinates and returns the schools sorted in ascending order of their distance from the provided coordinates.

## Features

- **Latitude and Longitude Validation**: The API validates that the provided latitude and longitude are within the valid range.
- **Distance Calculation**: The API calculates the distance from the user's coordinates to each school and returns the results sorted by proximity.
- **Data Persistence**: The schools data is stored in a MySQL database and fetched using Sequelize ORM.
- **Error Handling**: Comprehensive error handling for invalid input, missing parameters, and no schools found in the database.

## Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web framework for building the API.
- **Sequelize**: ORM for interacting with the MySQL database.
- **MySQL**: Database for storing school data.
- **Geolib**: Library for calculating distances between geographic coordinates.
- **TypeScript**: Programming language used for static typing.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/eduCase-assignment.git
   ```

2. **Install dependencies**:
   Navigate to the project folder and install the required dependencies using npm:
   ```bash
   npm install
   ```

3. **Setup MySQL Database**:
   - Ensure that MySQL is installed and running on your local machine or use a remote MySQL server.
   - Update the `dbConnection` configuration file (`./src/Database/dbConnection.ts`) with your MySQL connection credentials.

4. **Run the Application**:
   After setting up the database and configuration, run the server:
   ```bash
   npm run dev
   ```

5. **Access the API**:
   - The API will be running on `http://localhost:5050`.
   - You can now call the API with latitude and longitude to get the sorted list of schools:
     ```bash
     GET http://localhost:3000/schools/:latitude/:longitude
     ```

## API Endpoints

### `GET /schools/:latitude/:longitude`
- **Description**: Returns a list of schools sorted by distance from the provided latitude and longitude.
- **Parameters**:
  - `latitude` (required): The latitude of the user.
  - `longitude` (required): The longitude of the user.
- **Response**:
  - A list of schools, each with the following properties:
    - `id`: Unique identifier for the school.
    - `name`: The name of the school.
    - `address`: The address of the school.
    - `latitude`: The latitude of the school.
    - `longitude`: The longitude of the school.
    - `distanceInKm`: The calculated distance from the user's location in kilometers.

## Example Request

```bash
GET http://localhost:3000/schools/listSchool/40.7128/-74.0060
```

## Example Response

```json
[
  {
    "id": 1,
    "name": "ABC School",
    "address": "ABC street",
    "latitude": 40.7129,
    "longitude": -74.0061,
    "distanceInKm": "0.02"
  },
  {
    "id": 2,
    "name": "XYZ School",
    "address": "XYZ avenue",
    "latitude": 40.7100,
    "longitude": -74.0030,
    "distanceInKm": "0.3"
  }
]
```

## Error Handling


- **404 Not Found**: If no schools are found in the database.
- **500 Internal Server Error**: If an unexpected error occurs during processing.

