const app = require('./app');

const port = 5914;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
