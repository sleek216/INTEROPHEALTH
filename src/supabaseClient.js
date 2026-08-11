import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gtlhunjhlprbhutnpvxk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_89lkjac6LTpQ9eOy5cP3UA_JpehKORz';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
