const express = require('express')
const cors = require('cors')

// Create express instance
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// Require API routes
const list_notes = require('./routes/listNotes')

// Import API Routes
app.use(list_notes)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token, X-Socket-Id')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
