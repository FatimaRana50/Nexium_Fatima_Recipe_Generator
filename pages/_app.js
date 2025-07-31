import '../styles/globals.css'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        router.push('/generate')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        router.push('/generate')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  return <Component {...pageProps} user={user} />
}

export default MyApp
