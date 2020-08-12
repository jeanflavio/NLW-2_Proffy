import express, { response } from 'express';

const app = express();

app.get('/users', (req, res) => {
    const users = [
        { name: 'Jean', age: 24},
        { name: 'Taís', age: 28}
    ];

    return res.json(users);
})


app.listen(3005);