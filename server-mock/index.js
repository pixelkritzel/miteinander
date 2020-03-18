const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

const contacts = require('./contacts');

const people = require('./mockData/needing_help.json');

app.use(cors());
app.use(bodyparser.json());

app.get('/find_people', function(req, res, next) {
  const { userId, type } = req.query;
  if (!userId || !type) {
    res.sendStatus(400);
    return;
  }
  res.json(people);
});

app.get('/contacts/:id', async (req, res, next) => {
  const { id } = req.params;
  res.json(await contacts.get(id));
});

app.post('/contacts', async (req, res, next) => {
  const { userId, recipientId, category } = req.body;
  if (!userId || !recipientId || !category) {
    res.sendStatus(400);
    return;
  }
  const contact = await contacts.create(userId, recipientId, category);
  res.json(contact);
});

app.get('/humans/:id', async (req, res, next) => {
  const { id } = req.params;
  const human = people.find(({ id: humanId }) => humanId === id);
  if (human) {
    res.json(human);
  } else {
    res.status = 404;
  }
});

app.listen(1234, function() {
  console.log('CORS-enabled web server listening on port 1234');
});
