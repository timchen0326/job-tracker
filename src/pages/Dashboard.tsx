import { useUser } from '../context/AuthContext'
import JobList from '../components/JobList'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const user = useUser()
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.email}
          </h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
          >
            Sign Out
          </button>
        </header>
        <JobList />
      </div>
    </div>
  )
}
