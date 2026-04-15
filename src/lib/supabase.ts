import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://bqmdlkacnstgnqjplwkj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbWRsa2FjbnN0Z25xanBsd2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MjA0NDQsImV4cCI6MjA5MTA5NjQ0NH0.B0VOm80qVUN2GeM-Q3yUuNMs2hnOUDHO9Awb1Wns9EI'
)