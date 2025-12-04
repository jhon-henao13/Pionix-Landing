const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

export default supabase;