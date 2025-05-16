// src/components/VendorForm.tsx
import { useState } from "react"
import { db } from "../lib/firebase"
import FileUpload from "./FileUpload"
import {
  collection,
  addDoc,
  Timestamp
} from "firebase/firestore"

export default function VendorForm() {
  const [selectedEvent, setSelectedEvent] = useState<"poruwa"|"reception">("poruwa")
  const [name, setName]       = useState("")
  const [category, setCategory]       = useState("")
  const [contact, setContact] = useState("")
  const [fileUrl, setFileUrl] = useState<string|null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1️⃣ Get a reference to the sub-collection for this event
    const vendorsRef = collection(
      db,
      "events",
      selectedEvent,
      "vendors"
    )

    // 2️⃣ Add the document
    await addDoc(vendorsRef, {
      name,
      contact,
      category,
      catalogue: fileUrl || "",
      createdAt: Timestamp.now()
    })

    // 3️⃣ Reset form
    setName("")
    setContact("")
    setFileUrl(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* Event selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Event</label>
        <select
          value={selectedEvent}
          onChange={e =>
            setSelectedEvent(e.target.value as "poruwa"|"reception")
          }
          className="w-full border rounded p-2"
        >
          <option value="poruwa">Poruwa</option>
          <option value="reception">Reception</option>
        </select>
      </div>

      {/* Vendor Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Vendor Name
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Category
        </label>
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Contact Info */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Contact Info
        </label>
        <input
          value={contact}
          onChange={e => setContact(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      {/* PDF Catalogue upload */}
      <FileUpload
        folderPath={`events/${selectedEvent}/vendors`}
        onUpload={(url) => setFileUrl(url)}
      />

      {/* Submit */}
      <button
  type="submit"
  className="
    px-6 py-2
    bg-accent text-gray-900
    font-medium rounded
    hover:bg-accent-dark
    transition
    border-2 border-green-500
  "
>
  Add Vendor
</button>

    </form>
  )
}
