const express = require('express');
const app = express();
const db = require('./db')

app.use(express.json());

app.post('/api/customers', async (req, res, next) => {
const result = await db.createCustomer(req.body.name);
res.send(result);

});

const init = async() => {
await db.init();
app.listen(3000, () => (console.log('listening on port 3000')))

};

init();