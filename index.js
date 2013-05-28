var MuxDemux = require('mux-demux')
var ms = require('msgpack-stream')
var combine = require('stream-combiner')
var net = require('net')


var UnixMuxDemux = function (options) {
  this._options = options || {}

  this._pipe = this._options.pipe || process.env.MUX_DEMUX_PIPE || './muxdemux.sock'
}

UnixMuxDemux.prototype.createClient = function () {

  var self = this

  var mx = new MuxDemux({wrapper: function (stream) {
    return combine(ms.createDecodeStream(), stream, ms.createEncodeStream())
  }})

  var stream = net.connect(self._pipe)
  stream.pipe(mx).pipe(stream)

  return mx

}

UnixMuxDemux.prototype.createServer = function () {

  var self = this

  return net.createServer(function (stream) {

    var mx = new MuxDemux({wrapper: function (stream) {
      return combine(ms.createDecodeStream(), stream, ms.createEncodeStream())
    }})

    stream.pipe(mx).pipe(stream)


    mx.on('connection', function (stream) {
      console.log('connection established')
      var ds = stream.on('data', function (data) {
        console.log('data', data)
      })
    })

  }).listen(self._pipe, function () {

    })

}

module.exports = UnixMuxDemux