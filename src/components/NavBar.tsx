// src/components/NavBar.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded hover:bg-gray-100 ${
      router.pathname === path ? "text-accent font-semibold" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-lg font-bold text-accent">Wedding Planner</span>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <HiMenu />
        </button>

        <div className="hidden lg:flex space-x-4 items-center">
          <Link href="/vendors/addVendors" className={linkClass("/vendors/addVendors")}>
            Add Vendor
          </Link>
          <Link href="/vendors/list" className={linkClass("/vendors/list")}>
            Vendor List
          </Link>
          <Link href="/budget" className={linkClass("/budget")}>
            Budget Tracker
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2">
          <Link href="/vendors/addVendors" className={linkClass("/vendors/addVendors")}>
            Add Vendor
          </Link>
          <Link href="/vendors/list" className={linkClass("/vendors/list")}>
            Vendor List
          </Link>
          <Link href="/budget" className={linkClass("/budget")}>
            Budget Tracker
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
