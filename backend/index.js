const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const multer = require('multer');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');
const contactusRoutes = require('./routes/contactusRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likesRoutes = require('./routes/likesRoutes');
// Load environment variables
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connected"))
.catch(err => console.error("Database connection error: ", err));

// Test Route
app.get('/', (req, res) => {
    res.status(200).json("Hello World");
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/users', userRoutes);
app.use('/journal', journalRoutes);
app.use('/api/contactus', contactusRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likesRoutes);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
