const express = require('express')
const app = express()
const server = app.listen(8080)
process.once('SIGINT', () => {
  console.log('closing...')
  server.close(() => console.log('closed'))
})

app.get('/foo', function(req, res) {
  res.send('foo');
});

app.get('/bar', function(req, res) {
  process.kill(process.pid)
});