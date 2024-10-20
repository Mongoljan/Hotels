'use client'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';  // Import js-cookie

interface DashboardDictionary{
  title:string;
  welcomeMessage:string;
  hotelLabel:string;
}


export default function AdminDashboard({dict}:{dict: DashboardDictionary}) {



const hotelName= Cookies.get('hotelName')

  return (
    <div className=" text-black  ">
      <h1>Admin Dashboard</h1>
      <p>Welcome, </p> {/* Display user info */}
      <div>
        added some changes
      hotel: <div className=" text-black text-[30px]"> {hotelName}</div> 
        
      </div>
    </div>
  );
}
