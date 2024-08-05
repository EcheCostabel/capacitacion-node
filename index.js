const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

// const whiteList = ['http://localhost:3000', "https://myapp.co"];
// const options = {
//   origin: (origin, callback) => {
//     if(whiteList.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed'))
//     }
//   }
// }

// app.use(cors(options));
app.get('/', (req, res) => {
  res.send('Server');
});


routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Server listen on port ' +  port)
});
