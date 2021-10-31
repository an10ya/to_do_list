import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//Routes
import userRoutes from './routes/users.js';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '100mb', extended: true }));

//Starting of every User route
app.use('/users', userRoutes);

app.get('/', (req,res) => {
    //res.json({ message: 'Server is runnung '});
    res.send('Server is running');
});

const CONNECTION_URL = `mongodb+srv://Ekansh:chelseafc@cluster0.vxtzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = 5000;

/* Async wait block 
const dbConnection = await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Database connected ', dbConnection);
*/

// .then block
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server is running at PORT ${PORT} and connected to the database `)));