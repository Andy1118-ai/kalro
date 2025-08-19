import mysql from 'mysql2/promise'

// Create pool only if database environment variables are available
// This prevents build-time errors when database is not accessible
const createPool = () => {
  try {
    return mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'kalro_knowledge_hub',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      acquireTimeout: 60000,
      timeout: 60000,
    })
  } catch (error) {
    console.warn('Database pool creation failed:', error)
    return null
  }
}

const pool = createPool()

export default pool
