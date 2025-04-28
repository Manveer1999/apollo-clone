import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the doctors listing page
  redirect('/specialties/general-physician-internal-medicine');
  
  // This won't be rendered due to the redirect
  return null;
}
