//export a function will will takes app from express.
module.exports = app => {
  app.get('/api/contacts', (req, res) => {
    console.log(req);
    res.status(200).send();
  });
  app.get('/api/contact/:id', (req, res) => {
    res.status(200).send();
  });
  app.delete('/api/contact/:id', (req, res) => {
    res.status(200).send();
  });
  app.patch('/api/contact/:id', (req, res) => {
    res.status(200).send();
  });
};
