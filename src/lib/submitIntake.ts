import { supabase } from './supabase'

function generateReference(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `BUILD-${year}-${rand}`
}

export async function submitIntake(formData: {
  project_name: string
  client_name: string
  client_email: string
  budget: string
  features: string[]
  team_size: string
  start_date: string
  notes: string
}) {
  const reference_no = generateReference()

  // 1 — Save to Supabase first (so data is never lost even if email fails)
  const { data, error } = await supabase
    .from('intake_submissions')
    .insert([
      {
        reference_no,
        project_name: formData.project_name,
        client_name: formData.client_name,
        client_email: formData.client_email,
        budget: formData.budget,
        features: formData.features.join(', '),
        team_size: formData.team_size,
        start_date: formData.start_date,
        notes: formData.notes,
        status: 'pending',
        email_sent: false,
      }
    ])
    .select()
    .single()

  if (error) throw new Error(`Failed to save intake: ${error.message}`)

  // 2 — Send confirmation email via Supabase Edge Function
  try {
    await supabase.functions.invoke('send-confirmation', {
      body: {
        to: formData.client_email,
        reference_no,
        client_name: formData.client_name,
        project_name: formData.project_name,
      }
    })

    // Mark email as sent
    await supabase
      .from('intake_submissions')
      .update({ email_sent: true })
      .eq('id', data.id)

  } catch (emailError) {
    // Email failed but intake is already saved — log it, don't throw
    console.error('Email failed but intake was saved:', emailError)
  }

  return { reference_no, id: data.id }
}