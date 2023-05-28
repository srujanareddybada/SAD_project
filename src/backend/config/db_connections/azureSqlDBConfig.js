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
