const express = require('express')

const app = express()
.get('/', home)
.listen(3000)

function home(req, res){
	res.send('<h1>Helllooo</h1>\n')
}