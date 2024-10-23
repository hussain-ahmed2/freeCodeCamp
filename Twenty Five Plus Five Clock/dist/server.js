import express from 'express'
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./'));

app.listen(port, function() {
    console.log(`Server is running on http://localhost:${port}`);
});