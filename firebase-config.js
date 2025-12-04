const supabaseUrl = 'https://tghswkeltrklpfxwjmhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnaHN3a2VsdHJrbHBmeHdqbWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTI5NDIsImV4cCI6MjA4MDM4ODk0Mn0.92JO2dachRHUoAznuggUsviSYK6f0EAShrAYbERDeH8';

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

window.supabaseClient = supabaseClient;