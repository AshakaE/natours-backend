const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 5914;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
