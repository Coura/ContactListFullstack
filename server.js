const express = require('express');
const connectDB = require('./config/db');

const app= express();

//connect to DB
connectDB();

//init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req,res)=>res.json({msg:'contacts exercise'}))

//Define Routes
app.use('/api/users', require('./routes/users.routes.js'));
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/contacts', require('./routes/contacts.routes.js'));

const PORT =  process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));