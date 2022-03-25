# Vehicle Tracking System API
## Installation
```
npm install
```
# .env
modify database information in .env as the following sample information.
```
SVR_PORT=3003
SVR_IP="0.0.0.0"
DB_HOST=localhost
DB_PORT=3306
DB_USER=akn
DB_PASSWORD=passwordofdb
DB_NAME=vehicle_tracking_system
ALLOW_FROM=http://localhost:3000
```
**ALLOW_FROM** is for admin dashboard application
## Import database
we have to import our database from this file **../.../database/VehicleTrackingSystem.sql** to our mysql database.
## Run the program
```
npm start
```
## Testing
I have attached **Vehicle Tracking System.postman_collection.json** in **../../postman** directory.  
Import this file to postman. and make a test.