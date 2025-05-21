import { useState, useEffect, FormEvent } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Job } from '../types'
import '../index.css'

interface Props {
  onSaved: (job: Job) => void
  editingJob?: Job
}

export default function JobForm({ onSaved, editingJob }: Props) {
  const [company, setCompany] = useState(editingJob?.company ?? '')
  const [position, setPosition] = useState(editingJob?.position ?? '')
  const [appliedDate, setAppliedDate] = useState(
    editingJob?.applied_at?.slice(0, 10) ?? ''
  )
  const [status, setStatus] = useState(editingJob?.status ?? '')
  const [notes, setNotes] = useState(editingJob?.notes ?? '')
  const [url, setUrl] = useState(editingJob?.url ?? '')

  // Sync form fields when editingJob changes
  useEffect(() => {
    setCompany(editingJob?.company ?? '')
    setPosition(editingJob?.position ?? '')
    setAppliedDate(editingJob?.applied_at?.slice(0, 10) ?? '')
    setStatus(editingJob?.status ?? '')
    setNotes(editingJob?.notes ?? '')
    setUrl(editingJob?.url ?? '')
  }, [editingJob])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const payload = {
      company,
      position,
      applied_at: appliedDate,
      status,
      notes,
      url,
    }

    let response
    if (editingJob) {
      response = await supabase
        .from('jobs')
        .update(payload)
        .eq('id', editingJob.id)
        .select()
        .single()
    } else {
      response = await supabase
        .from('jobs')
        .insert(payload)
        .select()
        .single()
    }

    if (response.error) {
      alert(response.error.message)
      return
    }

    if (!response.data) {
      alert('No job data returned from Supabase.')
      return
    }

    onSaved(response.data)
    if (!editingJob) {
      setCompany('')
      setPosition('')
      setAppliedDate('')
      setStatus('')
      setNotes('')
      setUrl('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Company"
          required
          className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          value={position}
          onChange={e => setPosition(e.target.value)}
          placeholder="Position"
          required
          className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          type="date"
          value={appliedDate}
          onChange={e => setAppliedDate(e.target.value)}
          required
          className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <input
          value={status}
          onChange={e => setStatus(e.target.value)}
          placeholder="Status"
          required
          className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="URL (optional)"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Notes"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        type="submit"
        className="self-end px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
      >
        {editingJob ? 'Update' : 'Add'} Job
      </button>
    </form>
  )
}