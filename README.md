# MyRoadProject

**MyRoadProject** is a web application designed to manage and analyze road conditions using a combination of React for the frontend and Node.js for the backend. This project leverages PostgreSQL for data storage and Google Earth Engine for advanced satellite image analysis.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [File Structure](#file-structure)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Features

- **Frontend:**
  - User-friendly React interface for submitting road data and viewing analysis results.
  - Dynamic form for uploading road shapes and details.
  - Responsive design for various devices.

- **Backend:**
  - Node.js server to handle data processing and interaction with the PostgreSQL database.
  - Integration with Google Earth Engine for satellite image analysis.

- **Database:**
  - PostgreSQL database for storing road data and user submissions.

## Technologies Used

- **Frontend:**
  - React
  - React Router DOM
  - Tailwind CSS
  - Axios

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Google Earth Engine
  - `wellknown` (for converting WKT to GeoJSON)

- **Development Tools:**
  - Git
  - GitHub
  - npm (Node Package Manager)

## Installation

To get started with this project, follow these steps:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (for database setup)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/ademolabakare/MyRoadProject.git
cd MyRoadProject
```

### Set Up the Backend

1. Navigate to the `road-server` directory:
   ```bash
   cd road-server
   ```

2. Install the backend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables. Create a `.env` file in the `road-server` directory and add:
   ```plaintext
   DATABASE_URL=your_postgresql_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Set Up the Frontend

1. Navigate to the `road-condition-app` directory:
   ```bash
   cd ../road-condition-app
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend application will be accessible at `http://localhost:3000`, and the backend server will be running on `http://localhost:5000`.

## Usage

1. **Submit Road Data:**
   - Navigate to the homepage of the React app.
   - Fill out the form to upload road shape files and details.
   - Submit the form to process the road data.

2. **View Road Analysis:**
   - After submission, you will be redirected to a page showing the analysis results, which includes satellite images and processed data from Google Earth Engine.

## API Endpoints

- **POST `/upload`**
  - **Description:** Uploads road data including shape files and details.
  - **Request Body:** FormData with `roadName`, `location`, and `shapeFile`.
  - **Response:** URL of the processed road data.

- **GET `/process-road/:roadId`**
  - **Description:** Fetches and processes road data based on the `roadId`.
  - **Parameters:** `roadId` (required) - ID of the road.
  - **Response:** URL of the GeoTIFF file for the processed road data.

## File Structure

```
MyRoadProject/
├── road-server/
│   ├── node_modules/
│   ├── src/
│   │   ├── processRoad.js
│   │   ├── ...
│   ├── .env
│   ├── package.json
│   └── ...
└── road-condition-app/
    ├── node_modules/
    ├── src/
    │   ├── App.js
    │   ├── Home.js
    │   ├── ...
    ├── public/
    ├── package.json
    └── ...
```
Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature or fix bug"
   ```
4. Push your changes to your forked repository:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request to merge your changes into the main repository.

Contact

For any questions or issues, please reach out to Ademola (ademolabakareofficial@gmail.com).

---
Note: This is still a work in progress as of today 11th of september 2024. I still have a long way to go before it is ready.
