import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qspkjduyrmjezmmgjpcr.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcGtqZHV5cm1qZXptbWdqcGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNjIwNDEsImV4cCI6MjEwMTgzODA0MX0.fVj6m9iEmAI44gXkZnwYtkq0YO3ndQoys2cCF84jB9E'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
