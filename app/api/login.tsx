// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// Define your user authentication function (mocked for this example)
const authenticateUser = async (email: string, password: string): Promise<string | null> => {
  // Replace this with your actual authentication logic
  if (email === 'user@example.com' && password === 'password') {
    return 'your_jwt_token_here'; // Return the generated JWT token
  }
  return null; // Return null if authentication fails
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const token = await authenticateUser(email, password);

    if (token) {
      res.setHeader('Set-Cookie', `jwtToken=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax;`);
      return res.status(200).json({ message: 'Login successful!' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
