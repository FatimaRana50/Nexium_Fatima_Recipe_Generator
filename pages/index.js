import { useState } from 'react'
import supabase from '../lib/supabaseClient'

export default function Home() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage('❌ ' + error.message)
    else setMessage('✅ Check your inbox for the magic link!')
    setLoading(false)
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-lime-100 to-green-200 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/70 p-8 shadow-2xl backdrop-blur-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-green-800">
            🥗 Recipe Genie
          </h1>
          <p className="mt-2 text-blac">Login with your email to begin</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-600 px-4 py-3 text-white font-semibold shadow-md hover:bg-green-700 transition"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-black">{message}</p>
        )}
      </div>
    </main>
  )
}
