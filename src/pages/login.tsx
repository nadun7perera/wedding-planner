// src/pages/login.tsx
import { useState, useEffect } from 'react'
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/vendors/list')
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, pass)
      router.push('/vendors/list')
    } catch (err) {
      console.error(err)
      alert('Login failed. Please check your credentials.')
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="space-y-4 p-6 border rounded max-w-sm w-full">
        <h1 className="text-xl font-semibold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary p-2 rounded font-semibold hover:bg-opacity-90"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}