import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mbpoexddnqvecylzakzp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icG9leGRkbnF2ZWN5bHpha3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDM1MjEsImV4cCI6MjA3MDA3OTUyMX0.3kiEuVMiHWF6XNAGcb3pIbfQZ1KTEDkS-B6APezWMJ4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
