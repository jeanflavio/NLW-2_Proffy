import express, { response } from 'express';
import routes from './routes'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(routes);
app.use(cors());

app.get('/', (req, res) => {

    return res.json({ message: 'Hello Word'});
})


app.listen(3005);