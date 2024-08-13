const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/api/add-text', async (req, res) => {
    const { content } = req.body;

    const { data, error } = await supabase
        .from('text_entries')
        .insert([{ content }]);

    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Database insertion failed' });
    }
    res.status(200).json({ message: 'Text entry added successfully!', id: data[0].id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
