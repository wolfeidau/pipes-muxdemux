var fs = require('fs')
var UnixMuxDemux = require('../index.js')
var unixMuxDemux = new UnixMuxDemux()

var server = unixMuxDemux.createServer()


function cleanup(){
  console.log('Cleaning up socket', unixMuxDemux._pipe)
  if (fs.existsSync(unixMuxDemux._pipe)) fs.unlinkSync(unixMuxDemux._pipe)
}

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

