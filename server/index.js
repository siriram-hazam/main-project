import 'dotenv/config';

import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// * Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.send('Hello World!!')
})

// * Route file
import routes from './routes/mainRoutes.js'
app.use(routes)

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))