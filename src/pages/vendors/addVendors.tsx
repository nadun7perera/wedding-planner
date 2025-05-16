import { useEffect } from 'react';
import VendorForm from "../../components/VendorForm";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/router';

export default function AddVendorPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Vendor Tracker</h1>
      <VendorForm />
    </div>
  );
}