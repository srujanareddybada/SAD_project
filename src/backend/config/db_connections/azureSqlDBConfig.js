// Synopsis:
// 1. The code starts by importing the dotenv package to load environment variables from the .env file and the mssql package for connecting to the Azure SQL Database.
// 2. The configuration object is defined, which includes properties such as user, password, server, database, and options for encryption and certificate validation.
// 3. The connectToAzureSQLDB function is declared as an async function.
// 4. Inside the function, an attempt is made to establish a connection to the Azure SQL Database using the mssql.connect method, passing the configuration object.
// 5. If the connection is successful, a success message is logged to the console.
// 6. If there is an error during the connection, an error message is logged to the console.
// 7. The connectToAzureSQLDB function is exported as the module's main export using module.exports.

// Overview:
// The provided code is a module for connecting to an Azure SQL Database using the mssql library. It loads the required environment variables from a .env file,
// sets up the configuration object with the database connection details, and defines an async function named connectToAzureSQLDB to establish the connection.
// ************************************************************** Logic Start******************************************************************

require('dotenv').config(); // Load environment variables from .env file
const mssql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Enable encryption if needed
    trustServerCertificate: true, // Disable certificate validation if needed
  },
};

async function connectToAzureSQLDB() {
  try 
  {
    await mssql.connect(config);
    console.log('Connected to the Azure SQL Database');
  } catch (error) {
    console.error('Error connecting to the Azure SQL Database:', error);
  }
}

module.exports = connectToAzureSQLDB;
// connectToAzureSQLDB();
