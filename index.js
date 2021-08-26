import express from "express";
import bodyParser from "body-parser";
import env from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

// routes
import users from './routes/userRoute.js';

const app = express();
env.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());
app.use(helmet());

// routes path
app.use("/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
