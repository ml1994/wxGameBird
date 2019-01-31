(function () {
  const WebSocketServer = require('ws').Server
  const ws = new WebSocketServer({
    port: 8082
  })
  ws.on('connection', ws => {
    console.log('链接成功')
    ws.on('message', message => {
      console.log(message)
      ws.send('123')
    })
  })
})()