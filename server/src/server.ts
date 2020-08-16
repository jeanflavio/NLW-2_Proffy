import express, { response } from 'express';
import routes from './routes'

const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use(routes);
=======


app.get('/', (req, res) => {

    return res.json({ message: 'Hello Word'});
})

>>>>>>> 3f122f13653f9ed3f83b56402650dc59891e5cf9

app.listen(3005);