// src/pages/budget.tsx
import { useEffect }               from 'react'
import { useAuthState }            from 'react-firebase-hooks/auth'
import { auth }                    from '../lib/firebase'
import { useRouter }               from 'next/router'
import BudgetTracker from '@/components/BudgetTracker'

export default function VendorListPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

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
      <h1 className="text-2xl font-semibold mb-4">Budget Tracker</h1>
      <BudgetTracker />
    </div>
  )
}
