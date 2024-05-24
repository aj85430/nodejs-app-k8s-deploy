const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  console.log('Got request, waiting a bit');
  await delay(10 * 1000);
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const delay = async (timeout = 1000) => {
  return new Promise((resolve, reject) => setTimeout(resolve, 1000));
}
