import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Job } from '../types'
import JobForm from './JobForm'
import '../index.css'

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [editing, setEditing] = useState<Job | null>(null)
  const [notesModal, setNotesModal] = useState<string | null>(null)

  const fetchJobs = async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('applied_at', { ascending: false })

    if (error) {
      alert(error.message)
      return
    }

    setJobs(data ?? [])
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this job?')) return

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    setJobs(jobs.filter(j => j.id !== id))
  }

  const handleSaved = (job: Job) => {
    setEditing(null)
    fetchJobs()
  }

  // --- Bulk Paste Handler ---
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text')
    // Assume tab-separated values: company\tposition\tapplied_at\tstatus
    const [company, position, applied_at, status] = text.split('\t')
    if (company && position && applied_at && status) {
      supabase.from('jobs').insert([{ company, position, applied_at, status }]).then(fetchJobs)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg bg-white">
        <div className="mb-8">
          <JobForm onSaved={handleSaved} editingJob={editing ?? undefined} />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Paste jobs (from Excel/Sheets):
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white placeholder-gray-500"
            rows={3}
            placeholder="Paste: Company[TAB]Position[TAB]Applied At[TAB]URL[TAB]Notes[TAB]Status"
            onPaste={handlePaste}
          />
          <span className="text-xs text-gray-500">
            Paste one or more rows copied from Excel/Sheets (tab-separated)
          </span>
        </div>
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="py-3 px-4 border-r border-gray-300 text-left">Company</th>
                <th className="py-3 px-4 border-r border-gray-300 text-left">Position</th>
                <th className="py-3 px-4 border-r border-gray-300 text-left">Applied</th>
                <th className="py-3 px-4 border-r border-gray-300 text-left">URL</th>
                <th className="py-3 px-4 border-r border-gray-300 text-left">Notes</th>
                <th className="py-3 px-4 border-r border-gray-300 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr
                  key={job.id}
                  className={idx % 2 === 0 ? "bg-white hover:bg-gray-100" : "bg-gray-50 hover:bg-gray-100"}
                >
                  <td className="py-2 px-4 border-r border-gray-200">{job.company}</td>
                  <td className="py-2 px-4 border-r border-gray-200">{job.position}</td>
                  <td className="py-2 px-4 border-r border-gray-200">{job.applied_at}</td>
                  <td className="py-2 px-4 border-r border-gray-200">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        URL
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-2 px-4 border-r border-gray-200">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
                      onClick={() => setNotesModal(job.notes || 'No notes')}
                    >
                      View
                    </button>
                  </td>
                  <td className="py-2 px-4 border-r border-gray-200">
                    <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded">
                      {job.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex flex-row space-x-2">
                      <button
                        className="inline-flex items-center px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                        onClick={() => setEditing(job)}
                      >
                        <span className="material-icons mr-1" style={{ fontSize: 16 }}>edit</span>
                        Edit
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(job.id)}
                      >
                        <span className="material-icons mr-1" style={{ fontSize: 16 }}>delete</span>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      {notesModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setNotesModal(null)}
          ></div>
          <div className="relative bg-white border border-gray-300 p-4 rounded shadow w-80">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
              <button onClick={() => setNotesModal(null)} className="text-gray-500 text-2xl leading-none">
                &times;
              </button>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap break-words">
              {notesModal}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}