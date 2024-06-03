const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');
const cors = require('cors');

// Load environment variables
dotenv.config({path: '../../.env'});

// Initialize Express
const app = express();
app.use(cookieParser(process.env.CookieSecret));
// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const exampleRouter = require('./routes/auth_routes');
app.use('/api/example', exampleRouter);
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/tests', require('./routes/testCaseRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/compiler', require('./routes/compilerRoutes'));
// app.use('/api/execution', require('./routes/ProblemExecutionRoutes'));

// app.use('/api', require('./routes/solutionRoutes'));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
