const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
const path = require('path')

console.log(path.join(__dirname,'routes'))
console.log(path.basename(__filename,'.js'))

connectToMongo()


const app = express() 
app.use(cors())
const port = process.env.PORT || 5000 

app.use(express.json()) 
// app.get('/', (req, resp) => {  
//   resp.send('Hello World!')
// })
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/notes', require('./routes/notes'))

 
app.listen(port, () => {
  console.log(`I-Notebook backend app listening on port at http://localhost:${port}`)
})