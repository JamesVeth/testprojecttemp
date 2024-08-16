// Import necessary libraries
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://your-supabase-url.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-anon-public-key'; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to handle form submission
async function submitText() {
    const message = document.getElementById('message').value;
    const { data, error } = await supabase
        .from('text_entries')
        .insert([{ content: message }]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Data inserted:', data);
        // Fetch and display the last 10 entries
        const { data: entries, error: fetchError } = await supabase
            .from('text_entries')
            .select('*')
            .order('id', { ascending: false })
            .limit(10);

        if (fetchError) {
            console.error('Error fetching data:', fetchError);
        } else {
            document.getElementById('wordList').innerText = entries.map(entry => entry.content).join(' ');
        }
    }
}

// Attach the function to the global window object for access in HTML
window.submitText = submitText;
