import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

type Vendor = {
  id: string;
  name: string;
  contact: string;
  catalogue: string;
  category: string;
  totalPrice?: number;
  amountPaid?: number;
  itemsRented?: { item: string; quantity: number }[];
};

export default function VendorDetailsModal({
  vendor,
  event,
  onClose,
}: {
  vendor: Vendor;
  event: "Poruwa" | "Reception";
  onClose: () => void;
}) {
  const [totalPrice, setTotalPrice] = useState(vendor.totalPrice || 0);
  const [amountPaid, setAmountPaid] = useState(vendor.amountPaid || 0);
  const [itemsRented, setItemsRented] = useState(
    vendor.itemsRented?.length ? vendor.itemsRented : []
  );
  const [editSelected, setEditSelected] = useState(false);

  const handleSave = async () => {
    const vendorRef = doc(db, "events", event, "vendors", vendor.id);
    await updateDoc(vendorRef, {
      totalPrice,
      amountPaid,
      itemsRented,
    });
    setEditSelected(false);
    onClose();
  };

  const handleDelete = async () => {
    const vendorRef = doc(db, "events", event, "vendors", vendor.id);
    await deleteDoc(vendorRef);
    onClose();
  };

  const updateItem = (index: number, key: "item" | "quantity", value: any) => {
    const updated = [...itemsRented];
    updated[index] = { ...updated[index], [key]: value };
    setItemsRented(updated);
  };

  const addItem = () => {
    setItemsRented([...itemsRented, { item: "", quantity: 0 }]);
  };

  const removeItem = (index: number) => {
    const updated = itemsRented.filter((_, i) => i !== index);
    setItemsRented(updated);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">{vendor.name}</h2>

        {/* Total Price */}
        <label className="block mb-1 text-sm font-medium">Total Price (LKR)</label>
        {editSelected ? (
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
            className="w-full mb-4 border px-3 py-2 rounded"
          />
        ) : (
          <p className="mb-4">{totalPrice || "—"}</p>
        )}

        {/* Amount Paid */}
        <label className="block mb-1 text-sm font-medium">Amount Paid (LKR)</label>
        {editSelected ? (
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(Number(e.target.value))}
            className="w-full mb-4 border px-3 py-2 rounded"
          />
        ) : (
          <p className="mb-4">{amountPaid || "—"}</p>
        )}

        {/* Remaining */}
        <p className="mb-4 text-sm font-medium text-green-700">
          Remaining: LKR {totalPrice - amountPaid}
        </p>

        {/* Items Rented */}
        <label className="block mb-2 text-sm font-medium">Items Rented</label>
        {editSelected ? (
          <>
            {itemsRented.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Item"
                  value={item.item}
                  onChange={(e) => updateItem(index, "item", e.target.value)}
                  className="flex-1 border px-2 py-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", Number(e.target.value))
                  }
                  className="w-20 border px-2 py-1 rounded"
                />
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addItem}
              className="mb-4 text-blue-600 underline text-sm"
            >
              + Add another item
            </button>
          </>
        ) : (
          <ul className="mb-4 list-disc list-inside">
            {itemsRented.length > 0 ? (
              itemsRented.map((item, index) => (
                <li key={index}>
                  {item.item} – {item.quantity}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No items rented</p>
            )}
          </ul>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Vendor
          </button>

          {!editSelected ? (
            <button
              onClick={() => setEditSelected(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
