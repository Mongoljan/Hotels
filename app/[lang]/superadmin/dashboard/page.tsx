// 'use client'
import Cookies from 'js-cookie';  // Import js-cookie
import { getDictionary } from "../../dictionaries";


type Props = {
  params: { lang: string };
};


export default async function AdminDashboard({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang);

const hotelName= Cookies.get('hotelName')

  return (
    <div className=" text-black  ">
      <h1>Admin Dashboard</h1>
      <p>{dict.dashboard.welcomeMessage} </p> {/* Display user info */}
      <div>
        {dict.dashboard.hotelLabel} <div className=" text-black text-[30px]">{hotelName} </div> 
        
      </div>
    </div>
  );
}
