// app/auth/login/page.tsx
import LoginForm from './LoginForm'; // Import the new client component
import { getDictionary } from '../../dictionaries'; // Assuming this is your translation loader


export default async function LoginPage() {
  // Fetch system info or other data on the server
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/system-info/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();


  
  // const dict = await getDictionary('en'); // Example if using translations

  // Pass the server-side fetched data to the client-side component as props
  return (
    <div>
      <LoginForm description={data[0]?.description || 'Welcome!'} />
    </div>
  );
}
