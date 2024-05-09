import express from 'express';
import router from './routes/users.js';
import connectDB from './database.js';

const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;
const db = connectDB();
console.log("db.id:", db.id);

  app.use(router);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

