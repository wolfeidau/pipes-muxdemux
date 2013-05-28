var fs = require('fs')
var UnixMuxDemux = require('../index.js')
var unixMuxDemux = new UnixMuxDemux()

function cleanup(){
  console.log('Cleaning up socket', unixMuxDemux._pipe)
  if (fs.existsSync(unixMuxDemux._pipe)) fs.unlinkSync(unixMuxDemux._pipe)
}

var server = unixMuxDemux.createServer()

server.on('close', function(){
  cleanup()
})

// hit ctrl-c
process.on('SIGINT', function () {
  cleanup()
  process.exit(0)
})

// kill $pid
process.on('SIGTERM', function () {
  cleanup()
  process.exit(0)
})

