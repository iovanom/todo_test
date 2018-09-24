'use strict'

const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

app.use(bodyParser.json())

// Enable CORS 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');

  if('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }

});

// Serve static files also if the ENV var is set
if (process.env.STATIC_ROOT) {
  app.use(express.static(process.env.STATIC_ROOT));
}

// GET all tasks
app.get('/task', (req, res) => {
  db['Task'].findAll().then(tasks => {
    res.json(tasks);
  }).catch(err => {
    res.status(500).send(err);
  });
});

// GET a specific task
app.get('/task/:id', (req, res) => {
  db['Task'].findById(req.params.id)
    .then(task => {
      if (!task) {
        res.status(404).end();
      } else {
        res.json(task);
      }
    });
});

// POST a new task
app.post('/task', (req, res) => {
  let taskName = req.body['name']
  if (!taskName) {
    res.status(400).send('ERROR: The name param is required.')
  }
  db['Task'].create({name: taskName}).then(instance => {
    res.json(instance);
  }).catch(err => {
    res.status(400).send(err);
  });
});

// PUT update the task
app.put('/task/:id', (req, res) => {
  let taskName = req.body['name']
  if (!taskName) {
    res.status(400).send('ERROR: The name param is required.')
  }
  db['Task'].findById(req.params.id)
    .then(task => {
      if (!task) {
        // The task not found
        return Promise.reject()
      }
      task.set('name', taskName)
      return task.save();
    }).then(task => { res.json(task); }, (err) => {
      console.log(err);
      res.status(404).end();
    });
  });

// DELETE the task
app.delete('/task/:id', (req, res) => {
  db['Task'].findById(req.params.id)
    .then(task => {
      if (!task) {
        // The task not found
        return Promise.reject()
      }
      return task.destroy()
    })
    .then(() => { res.json({'status': 'ok'}) }, () => { res.status(404).end() });
});

app.listen(process.env["PORT"] || 3000);
