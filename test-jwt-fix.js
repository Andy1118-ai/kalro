const jwt = require('jsonwebtoken')

const JWT_SECRET = 'your-super-secret-jwt-key-for-kalro-admin-portal-2024'

console.log('Testing JWT with consistent secret...')

// Create a token (simulating login)
const token = jwt.sign(
  { userId: 1, email: 'admin@kalro.org', role: 'admin' },
  JWT_SECRET,
  { expiresIn: '24h' }
)

console.log('Generated token:', token.substring(0, 50) + '...')

// Verify the token (simulating middleware)
try {
  const decoded = jwt.verify(token, JWT_SECRET)
  console.log('✅ JWT verification successful!')
  console.log('Decoded token:', decoded)
  console.log('User role:', decoded.role)
  console.log('Is admin?', decoded.role === 'admin')
} catch (error) {
  console.log('❌ JWT verification failed:', error.message)
}
