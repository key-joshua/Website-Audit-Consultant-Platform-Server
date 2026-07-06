# WEBSITE AUDIT CONSULTANT PLATFORM-SERVER

This a web app that collects basic public data from a website and turns it into a simple audit dashboard.

1. It audit the website URL.
2. It list all audited versions of tested website URL.
3. It view a concrete specific audited version of website URL.

## INSTALLATION, DB SETUP AND START APP

### OPTION THREE (NO NEED OF DB SETUP)

1. Clone the repository:

   ```sh
   git clone https://github.com/key-joshua/Website-Audit-Consultant-Platform-Server.git

2. Copy `.env.example` to `.env` and add values to all variables.

3. Run this command ```docker compose build```

4. Run this commands:
   - ```docker compose exec server_replicate_1 npm run deleteAllTables```

   - ```docker compose exec server_replicate_1 npm run createAllTables```

   - ```docker compose exec server_replicate_1 npm run createAllSeeds```

### OPTION TWO (NEED OF DB SETUP)

1. Clone the repository:

   ```sh
   git clone https://github.com/key-joshua/Website-Audit-Consultant-Platform-Server.git
   ```
2. Node Version ```22.12.0```.

3. Copy `.env.example` to `.env` and add values to all variables.

4. Setup Database, create Database and the get all DB credentials ```DEVELOPMENT_DB_POSTGRESQL_PORT```, ```DEVELOPMENT_DB_POSTGRESQL_HOST```, ```DEVELOPMENT_DB_POSTGRESQL_USERNAME```, ```DEVELOPMENT_DB_POSTGRESQL_PASSWORD``` and ```DEVELOPMENT_DB_POSTGRESQL_DATABASE```.

   - Run this command ```npx sequelize init```.
   - Run this script ```npm run deleteAllTables```.
   - Run this script ```npm run createAllTables```.
   - Run this script ```npm run createAllSeeds```.

5. Install dependencies:

   ```sh
   npm install
   ```

6. Copy `.env.example` to `.env` and add values to all variables.

7. Start the server:
   ```sh
   npm run dev
   ```
