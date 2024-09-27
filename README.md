###  Problem Statement
- Generate travel Itineraries based on user preferences.
---
### Solution

- A web app on which user can enter their preferences and receive multiple travel options based on their inputs.
- Deployed at https://atlan-travel-itinerary.vercel.app/
---
### Tech Stack

- Frontend  - React
- Backend - Spring Boot, Containerised using Docker
- Database - Neo4j Graph DB
- Hosting - Vercel and Render (Free tier so very slow)

---
##### Code Repositories

Frontend - https://github.com/rajxsv/travelItinerary
Backend  - https://github.com/rajxsv/travelitinerarybackend

---

### Application and Solution flow

- The frontend takes in user inputs from these mentioned fields or using a prompt to ai chat bot
- Fetches routes based on user preferences by using cypher query on graph db sorted acc to preferences.
- User can now select the desired route and view details

---
### Core Query Logic and Effectiveness of Database

The query finds paths between cities based on user input (budget, duration, and interests). It matches cities, attractions, accommodations, and restaurants. Then, it filters by budget, duration, and user interests, calculates total costs and time for the trip (including travel), and returns valid paths within the user's constraints (total cost and trip time).

Another query does not take startCity into account and rather finds all the relationships where the user interests exists and then creates paths which takes into account all the cities with user interests.

GraphDBs excel at traversing relationships (e.g., city connections) quickly, making multi-hop queries (up to 6 hops) faster than SQL, which would require complex joins. The "upto 6 hops" parameter was chosen as a balance between number of cities in the db and possible number of paths. Although, this number can be increased as much as possible giving us redundant and repeated paths as well.

In GraphDB, relationships (like `CONNECTED_TO`, `HAS_ATTRACTION`) are first-class citizens, making it easier to model and query interconnected data, unlike SQL where relations are implied through joins. Even while getting all the interests we don't really need to be concerned about the exact cities but rather only their activities, accommodations etc as a separate entity.

GraphDB scales better for complex, interconnected data (e.g., cities, attractions, routes), avoiding the overhead of numerous joins or subqueries required in relational databases.

Neo4j allows writing query through its cypher query language, for the exact query refer to the backend code in the file CityController.java.
Neo4j and Cypher - https://neo4j.com/docs/cypher-manual/current/introduction/cypher-neo4j/

---
### API Endpoints Configuration

##### 1. **Find All Interests**

- **URL**: `/v1/findAllInterests`
- **Method**: `GET`
- **Description**: Retrieves all unique interest types from activities, restaurants, accommodations, and attractions.
- **Response**: Returns a list of interest types such as activity types, cuisines, accommodation types, and attraction names.

##### 2. **Find Optimal Trips with Start City**

- **URL**: `/v1/findOptimalTripsWithStartCity`
- **Method**: `GET`
- **Description**: Retrieves optimal trips starting from a specific city based on user budget, interests, and trip duration constraints.
- **Query Parameters**:
    - `userMaxBudget`: Maximum budget allowed for the trip.
    - `maxTripDuration`: Maximum duration allowed for the trip.
    - `userInterests`: List of user-selected interests.
    - `userBudget`: User's budget level (e.g., low, medium, high).
    - `startCityName`: Name of the city where the trip starts.
- **Response**: Returns details of cities along the path, including city names, attractions, accommodations, restaurants, activities, total trip cost, and total trip duration.

##### 3. **Find Optimal Trips**

- **URL**: `/v1/findOptimalTrips`
- **Method**: `GET`
- **Description**: Retrieves optimal trips based on user budget, interests, and trip duration without specifying a start city.
- **Query Parameters**:
    - `userMaxBudget`: Maximum budget allowed for the trip.
    - `maxTripDuration`: Maximum duration allowed for the trip.
    - `userInterests`: List of user-selected interests.
    - `userBudget`: User's budget level (e.g., low, medium, high).
- **Response**: Returns details of cities along the path, including city names, attractions, accommodations, restaurants, activities, total trip cost, and total trip duration.

##### 4. **Handle Undefined Routes**

- **URL**: `*`
- **Method**: `GET`
- **Description**: Handles undefined routes and returns an error message.
- **Response**: Displays a message indicating an invalid route.

---
### How to Run in your Machine Locally

##### Frontend Setup (Vite + React)

1. **Clone the Frontend Repository:**
   `git clone https://github.com/rajxsv/travelItinerary.git`
   `cd travelItinerary`

2. **Install Dependencies:** Make sure you have Node.js installed. Run the following command to install the necessary packages:
   `npm install`

3. **Run the Development Server:** After installing dependencies, start the development server with:
   `npm run dev`
   The application will be running at `http://localhost:5173` by default.

4. **Build for Production:** To create a production build, run:
   `npm run build`

##### Backend Setup (Spring Boot + Java 21)

1. **Clone the Backend Repository:**
   `git clone https://github.com/rajxsv/itineraryBackend.git`
   `cd itineraryBackend`

2. **Configure Application Properties:** Update the `application.properties` file in `src/main/resources/` with the correct credentials and database details for Neo4j:
   `spring.neo4j.uri=your_db_uri`
   `spring.neo4j.authentication.username=neo4j`
   `spring.neo4j.authentication.password=your_password`
3. **Build the Project:** Ensure Maven is installed and build the project:
   `mvn clean install`

4. **Run the Spring Boot Application:** After building, run the Spring Boot server:
   `mvn spring-boot:run`
   The backend will be running at `http://localhost:8080`.

