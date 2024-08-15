// Import necessary libraries
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Route to handle adding text entries
app.post('/add-text', async (req, res) => {
    const { content } = req.body;

    try {
        // Insert the new text entry into the database
        const { data, error } = await supabase
            .from('text_entries')
            .insert([{ content }]);

        if (error) {
            throw error; // Handle any errors that occur during insertion
        }

        // Respond with a success message and the inserted data
        res.status(200).json({ message: 'Text entry added successfully!', data });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding text:', error);
        res.status(500).json({ error: 'Failed to add text entry' });
    }
});

// Route to handle retrieving text entries (optional)
app.get('/get-text', async (req, res) => {
    try {
        // Retrieve all text entries from the database
        const { data, error } = await supabase
            .from('text_entries')
            .select('*');

        if (error) {
            throw error; // Handle any errors that occur during retrieval
        }

        // Respond with the retrieved data
        res.status(200).json(data);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving text:', error);
        res.status(500).json({ error: 'Failed to retrieve text entries' });
    }
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
