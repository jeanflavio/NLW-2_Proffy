import express, { response } from 'express';
import routes from './routes'

const app = express();

app.use(express.json());

app.use(routes);


app.get('/', (req, res) => {

    return res.json({ message: 'Hello Word'});
})


app.listen(3005);