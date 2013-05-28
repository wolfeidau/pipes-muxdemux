var UnixMuxDemux = require('../index.js')
var unixMuxDemux = new UnixMuxDemux()


var client = unixMuxDemux.createClient()

var ds = client.createWriteStream('times')

setInterval(function () {
  console.log('write')
  ds.write(new Date().toString())
}, 1e3)
