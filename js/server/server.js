(function () {
  const http = require('http')
  http.createServer((req, res) => {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      res.end('serverData')
      console.log(body)
    })
  }).listen(8081)
})()