import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-gray-100 border-b">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">Wedding Planner</h1>
          <ul className="flex space-x-4">
            <li><Link href="/guests" className="hover:underline">Guests</Link></li>
            <li><Link href="/budget-tracker" className="hover:underline">Budget</Link></li>
            <li><Link href="/vendors/addVendors" className="hover:underline">Add Vendor</Link></li>
            <li><Link href="/vendors/list" className="hover:underline">Vendor List</Link></li>          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}