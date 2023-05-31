const mssql = require('mssql');
const connectToAzureSQLDB = require('./azureSqlDBConfig'); // Replace "./your-module" with the actual module path
const dotenv = require('dotenv');

// Specify the path to your .env file
const envPath = "/backend/.env";
dotenv.config({ path: envPath });

describe('Azure SQL Database Connection', () => {
  beforeAll(() => {
    dotenv.config(); // Load environment variables from .env file

    // Set up the environment variables required for the test
    process.env.DB_USER = process.env.DB_USER;
    process.env.DB_PASSWORD = process.env.DB_PASSWORD;
    process.env.DB_SERVER = process.env.DB_SERVER;
    process.env.DB_NAME = process.env.DB_NAME;
  });

  afterAll(async () => {
    // Clean up resources, close connections, etc.
    await mssql.close();
  });

  it('should connect to the Azure SQL Database successfully', async () => {
    await connectToAzureSQLDB();

    // Attempt to execute a simple query to verify the connection
    try {
      const pool = await mssql.connect();
      const result = await pool.request().query('SELECT 1');
      expect(result.recordset[0]['']).toBe(1);
    } catch (error) {
      console.error('Error executing query:', error);
    }
  });
});
