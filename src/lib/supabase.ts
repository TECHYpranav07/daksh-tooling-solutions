import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://oczwxcrkytfgrwtxfxay.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jend4Y3JreXRmZ3J3dHhmeGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwMjU1NjksImV4cCI6MjEwNDYwMTU2OX0.Rd8vys_on1A7BrCZtExkrOJHgoj5QANU1An78f0rDng'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
