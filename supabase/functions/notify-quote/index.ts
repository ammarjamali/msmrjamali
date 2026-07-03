import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const TO_EMAIL = 'contact@msmrjamali.in'
const FROM_EMAIL = 'quotes@msmrjamali.in'

serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record

    const emailBody = `
New quote request received on msmrjamali.in

Name:     ${record.name}
Phone:    ${record.phone}
Email:    ${record.email || '—'}
Message:  ${record.message || '—'}
Load Capacity Required: ${record.desired_load_capacity_kg ? record.desired_load_capacity_kg + ' kg' : '—'}
Submitted: ${new Date(record.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

---
View all requests: https://supabase.com/dashboard/project/_/editor
    `.trim()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New Quote Request from ${record.name}`,
        text: emailBody,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend error:', error)
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error('Function error:', err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})