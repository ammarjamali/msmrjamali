import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  category_id: '',
  desired_load_capacity_kg: '',
  message: '',
}

function Quote() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('sort_order')
      if (!error) setCategories(data)
    }
    fetchCategories()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const { error } = await supabase.from('quote_requests').insert({
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      category_id: form.category_id || null,
      desired_load_capacity_kg: form.desired_load_capacity_kg
        ? Number(form.desired_load_capacity_kg)
        : null,
      message: form.message || null,
    })

    if (error) {
      console.error('Error submitting quote request:', error)
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again, or call/WhatsApp us directly.')
      return
    }

    setStatus('success')
    setForm(initialForm)
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-brand-navy mb-3">Thank you!</h1>
        <p className="text-brand-charcoal mb-8">
          We've received your request and will get back to you shortly. For anything
          urgent, feel free to call us directly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand-blue font-semibold hover:underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-navy mb-2">Get a Quote</h1>
      <p className="text-brand-charcoal mb-10">
        Tell us what you need and we'll get back to you with pricing and availability.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-navy mb-1">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-brand-grey rounded-md px-4 py-2.5 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-navy mb-1">
            Phone number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-brand-grey rounded-md px-4 py-2.5 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-navy mb-1">
            Email (optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-brand-grey rounded-md px-4 py-2.5 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-semibold text-brand-navy mb-1">
            Which product are you interested in? (optional)
          </label>
          <select
            id="category_id"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border border-brand-grey rounded-md px-4 py-2.5 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
          >
            <option value="">Not sure / general inquiry</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="desired_load_capacity_kg" className="block text-sm font-semibold text-brand-navy mb-1">
            Desired load capacity per shelf, in kg (optional)
          </label>
          <input
            id="desired_load_capacity_kg"
            name="desired_load_capacity_kg"
            type="number"
            min="0"
            step="any"
            value={form.desired_load_capacity_kg}
            onChange={handleChange}
            placeholder="e.g. 150"
            className="w-full border border-brand-grey rounded-md px-4 py-2.5 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-brand-navy mb-1">
            Tell us more (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Sizes you need, quantity, where it'll be installed, etc."
            className="w-full border border-brand-grey rounded-md px-4 py-2.5 text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {status === 'error' && (
          <p className="text-sm text-brand-red">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-brand-red text-white font-semibold px-8 py-3 rounded-md hover:bg-red-600 transition-colors disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send request'}
        </button>
      </form>
    </div>
  )
}

export default Quote