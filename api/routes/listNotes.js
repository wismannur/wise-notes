const { Router } = require('express')
const connection = require('../configDB')

const router = Router()

// Test route
router.get('/list-notes', (req, res) => {
  connection.query(
		'SELECT * FROM list_notes',
		(error, results) => {
			res.status(200).json(results);
		}
	)
})

router.post('/list-notes/add', (req, res) => {
  connection.query(
    `INSERT INTO list_notes (title, notes, created_at) VALUES (?, ?, ?)`,
    [req.body.title, req.body.notes, req.body.created_at],
		(error, results) => {
      console.log('results ', results);
			res.status(201).send({
        code: 0,
        message: 'New Note Successfully Saved.',
        results: results,
        error: error,
      });
		}
	)
})

router.post('/list-notes/delete', (req, res) => {
  connection.query(
    `DELETE FROM list_notes WHERE id = ? `,
    [req.body.id],
		(error, results) => {
      console.log('results ', results);
			res.status(201).send({
        code: 0,
        message: 'Note Successfully Deleted.',
        results: results,
        error: error,
      });
		}
	)
})

router.post('/list-notes/update', (req, res) => {
  connection.query(
    `UPDATE list_notes SET title = ?, notes = ? WHERE id = ? `,
    [req.body.title, req.body.notes, req.body.id],
		(error, results) => {
      console.log('results ', results);
			res.status(201).send({
        code: 0,
        message: 'Note Successfully Updated.',
        results: results,
        error: error,
      });
		}
	)
})

module.exports = router
