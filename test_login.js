const { SignJWT } = require('jose');
const crypto = require('crypto');

async function test() {
  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-jwt-key-min-32-chars');
  
  // User ID from DB
  const userId = 'cmmv8nftl0001l104o7pfu4yb';
  
  const token = await new SignJWT({
    userId: userId,
    email: 'wiranlarbiofficiel@gmail.com',
    role: 'AFFILIATE',
    name: 'Mohamed'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  console.log("Generated Token:", token);
  
  // Call /api/auth/me
  const resMe = await fetch('http://localhost:3000/api/auth/me', {
    headers: {
      'Cookie': `auth-token=${token}`
    }
  });
  
  console.log("Status:", resMe.status);
  const text = await resMe.text();
  console.log("Response:", text);
}

test();
