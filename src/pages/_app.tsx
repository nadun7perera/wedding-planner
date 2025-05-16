// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../lib/firebase'
import NavBar from '../components/NavBar'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user)
      setLoading(false)
      if (!user && router.pathname !== '/login') {
        router.replace('/login')
      }
      if (user && router.pathname === '/login') {
        router.replace('/vendors/list')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) return null

  return (
    <>
      {authenticated && <NavBar />}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Component {...pageProps} />
      </main>
    </>
  )
}