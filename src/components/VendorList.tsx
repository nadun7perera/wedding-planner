// src/components/VendorList.tsx
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import VendorDetailsModal from "./VendorDetailsModal";

type Vendor = {
  id: string;
  name: string;
  contact: string;
  catalogue: string;
  category: string;
  totalPrice?: number;
  amountPaid?: number;
  items?: { name: string; quantity: number }[];
};

export default function VendorList() {
  const [selectedEvent, setSelectedEvent] = useState<"Poruwa" | "Reception">("Reception");
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    // Listen to vendors sub-collection under the selected event
    const q = query(
      collection(db, "events", selectedEvent, "vendors"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe: Unsubscribe = onSnapshot(q, (snapshot) => {
      setVendors(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Vendor, "id">),
        }))
      );
    });
    return () => unsubscribe();
  }, [selectedEvent]);

  return (
    <div className="mt-8">
      {/* Event selector */}
      <div className="mb-6 flex items-center space-x-3 px-6">
        <label htmlFor="event" className="font-medium text-gray-700">
          Select event:
        </label>
        <select
          id="event"
          value={selectedEvent}
          onChange={(e) =>
            setSelectedEvent(e.target.value as "Poruwa" | "Reception")
          }
          className="border rounded px-3 py-2"
        >
          <option value="Poruwa">Poruwa</option>
          <option value="Reception">Reception</option>
        </select>
      </div>

      {/* Optional banner image */}
      <div className="-mx-6 mb-4">
        <img
          src="/vendor-list.jpg"
          alt="Wedding table setting"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-4 items-center px-6 mb-2 pb-2 border-b border-gray-300 text-sm font-medium text-gray-600">
        <div>Vendor</div>
        <div>Contact</div>
        <div>Category</div>
        <div>Catalogue</div>
      </div>

      {/* Vendor rows */}
      <div className="divide-y divide-gray-300">
        {vendors.map((v) => (
          <div
            key={v.id}
            onClick={() => setSelectedVendor(v)}
            className="py-4 grid grid-cols-4 items-center px-6"
          >
            <div className="text-lg text-gray-900">{v.name}</div>
            <div className="text-sm text-gray-600">{v.contact}</div>
            <div className="text-sm text-gray-600">{v.category}</div>
            <div>
              <a
                href={v.catalogue}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block 
                  bg-accent text-gray-900 
                  font-medium 
                  rounded 
                  hover:bg-accent-dark 
                  transition
                "
                onClick={(e) => e.stopPropagation()}
              >
                View Catalogue
              </a>
            </div>
          </div>
        ))}
      </div>

            {/* Vendor Modal */}
            {selectedVendor && (
        <VendorDetailsModal
          vendor={selectedVendor}
          event={selectedEvent}
          onClose={() => setSelectedVendor(null)}
        />
      )}
    </div>
  );
}
