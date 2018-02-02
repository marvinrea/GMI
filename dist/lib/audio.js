'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.stopAllSounds = exports.stopSound = exports.playSound = exports.loadSounds = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _wavesLoaders = require('waves-loaders');

var loaders = _interopRequireWildcard(_wavesLoaders);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// safari compatible
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

var SampleSynth = function () {
    function SampleSynth(buffer) {
        (0, _classCallCheck3.default)(this, SampleSynth);

        this.buffer = buffer;
        this.output = audioContext.createGain();
        // this.trigger = this.trigger.bind(this);
    }

    (0, _createClass3.default)(SampleSynth, [{
        key: 'startTrigger',
        value: function startTrigger() {
            var src = audioContext.createBufferSource();
            src.buffer = this.buffer;
            src.connect(audioContext.destination);
            src.start(0);
        }
    }, {
        key: 'stopTrigger',
        value: function stopTrigger() {
            this.src.stop(0);
        }
    }]);
    return SampleSynth;
}();

var sampleSynths = [];

function init(buffers) {
    buffers.forEach(function (buffer) {
        var synth = new SampleSynth(buffer);
        sampleSynths.push(synth);
    });
}

function loadSoundIntoBuffers(buffers, callback) {
    var loader = new loaders.AudioBufferLoader();
    loader.load(buffers) // return a Promise
    .then(callback);
}

function loadSounds(buffers) {
    loadSoundIntoBuffers(buffers, init);
}

function deleteSynths() {
    sampleSynths = [];
}

function playSound(index) {
    sampleSynths[index - 1].startTrigger();
}

function stopSound(index) {
    sampleSynths[index - 1].stopTrigger();
}

function stopAllSounds() {
    // TODO if needed
}

exports.loadSounds = loadSounds;
exports.playSound = playSound;
exports.stopSound = stopSound;
exports.stopAllSounds = stopAllSounds;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1ZGlvLmpzIl0sIm5hbWVzIjpbImxvYWRlcnMiLCJBdWRpb0NvbnRleHQiLCJ3aW5kb3ciLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJhdWRpb0NvbnRleHQiLCJTYW1wbGVTeW50aCIsImJ1ZmZlciIsIm91dHB1dCIsImNyZWF0ZUdhaW4iLCJzcmMiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJzdGFydCIsInN0b3AiLCJzYW1wbGVTeW50aHMiLCJpbml0IiwiYnVmZmVycyIsImZvckVhY2giLCJzeW50aCIsInB1c2giLCJsb2FkU291bmRJbnRvQnVmZmVycyIsImNhbGxiYWNrIiwibG9hZGVyIiwiQXVkaW9CdWZmZXJMb2FkZXIiLCJsb2FkIiwidGhlbiIsImxvYWRTb3VuZHMiLCJkZWxldGVTeW50aHMiLCJwbGF5U291bmQiLCJpbmRleCIsInN0YXJ0VHJpZ2dlciIsInN0b3BTb3VuZCIsInN0b3BUcmlnZ2VyIiwic3RvcEFsbFNvdW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBQVlBLE87Ozs7OztBQUVaO0FBQ0EsSUFBTUMsZUFBZUMsT0FBT0QsWUFBUCxJQUF1QkMsT0FBT0Msa0JBQW5EO0FBQ0EsSUFBTUMsZUFBZSxJQUFJSCxZQUFKLEVBQXJCOztJQUdNSSxXO0FBQ0YseUJBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsYUFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsYUFBS0MsTUFBTCxHQUFjSCxhQUFhSSxVQUFiLEVBQWQ7QUFDQTtBQUNIOzs7O3VDQUNjO0FBQ1gsZ0JBQU1DLE1BQU1MLGFBQWFNLGtCQUFiLEVBQVo7QUFDQUQsZ0JBQUlILE1BQUosR0FBYSxLQUFLQSxNQUFsQjtBQUNBRyxnQkFBSUUsT0FBSixDQUFZUCxhQUFhUSxXQUF6QjtBQUNBSCxnQkFBSUksS0FBSixDQUFVLENBQVY7QUFDSDs7O3NDQUNhO0FBQ1YsaUJBQUtKLEdBQUwsQ0FBU0ssSUFBVCxDQUFjLENBQWQ7QUFDSDs7Ozs7QUFHTCxJQUFJQyxlQUFlLEVBQW5COztBQUVBLFNBQVNDLElBQVQsQ0FBY0MsT0FBZCxFQUF1QjtBQUNyQkEsWUFBUUMsT0FBUixDQUFnQixrQkFBVTtBQUN4QixZQUFNQyxRQUFRLElBQUlkLFdBQUosQ0FBZ0JDLE1BQWhCLENBQWQ7QUFDQVMscUJBQWFLLElBQWIsQ0FBa0JELEtBQWxCO0FBQ0QsS0FIRDtBQUlEOztBQUVELFNBQVNFLG9CQUFULENBQThCSixPQUE5QixFQUF1Q0ssUUFBdkMsRUFBaUQ7QUFDL0MsUUFBTUMsU0FBUyxJQUFJdkIsUUFBUXdCLGlCQUFaLEVBQWY7QUFDQUQsV0FDR0UsSUFESCxDQUNRUixPQURSLEVBQ2lCO0FBRGpCLEtBRUdTLElBRkgsQ0FFUUosUUFGUjtBQUdEOztBQUVELFNBQVNLLFVBQVQsQ0FBb0JWLE9BQXBCLEVBQTZCO0FBQ3pCSSx5QkFBcUJKLE9BQXJCLEVBQThCRCxJQUE5QjtBQUNIOztBQUVELFNBQVNZLFlBQVQsR0FBd0I7QUFDcEJiLG1CQUFlLEVBQWY7QUFDSDs7QUFFRCxTQUFTYyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN0QmYsaUJBQWFlLFFBQVEsQ0FBckIsRUFBd0JDLFlBQXhCO0FBQ0g7O0FBRUQsU0FBU0MsU0FBVCxDQUFtQkYsS0FBbkIsRUFBMEI7QUFDdEJmLGlCQUFhZSxRQUFRLENBQXJCLEVBQXdCRyxXQUF4QjtBQUNIOztBQUVELFNBQVNDLGFBQVQsR0FBeUI7QUFDckI7QUFDSDs7UUFJUVAsVSxHQUFBQSxVO1FBQVlFLFMsR0FBQUEsUztRQUFXRyxTLEdBQUFBLFM7UUFBV0UsYSxHQUFBQSxhIiwiZmlsZSI6ImF1ZGlvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbG9hZGVycyBmcm9tICd3YXZlcy1sb2FkZXJzJztcblxuLy8gc2FmYXJpIGNvbXBhdGlibGVcbmNvbnN0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbmNvbnN0IGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxuXG5jbGFzcyBTYW1wbGVTeW50aCB7XG4gICAgY29uc3RydWN0b3IoYnVmZmVyKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICB0aGlzLm91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgICAgIC8vIHRoaXMudHJpZ2dlciA9IHRoaXMudHJpZ2dlci5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBzdGFydFRyaWdnZXIoKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgc3JjLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICBzcmMuc3RhcnQoMCk7XG4gICAgfVxuICAgIHN0b3BUcmlnZ2VyKCkge1xuICAgICAgICB0aGlzLnNyYy5zdG9wKDApO1xuICAgIH1cbn1cblxubGV0IHNhbXBsZVN5bnRocyA9IFtdO1xuXG5mdW5jdGlvbiBpbml0KGJ1ZmZlcnMpIHtcbiAgYnVmZmVycy5mb3JFYWNoKGJ1ZmZlciA9PiB7XG4gICAgY29uc3Qgc3ludGggPSBuZXcgU2FtcGxlU3ludGgoYnVmZmVyKTtcbiAgICBzYW1wbGVTeW50aHMucHVzaChzeW50aCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkU291bmRJbnRvQnVmZmVycyhidWZmZXJzLCBjYWxsYmFjaykge1xuICBjb25zdCBsb2FkZXIgPSBuZXcgbG9hZGVycy5BdWRpb0J1ZmZlckxvYWRlcigpO1xuICBsb2FkZXJcbiAgICAubG9hZChidWZmZXJzKSAvLyByZXR1cm4gYSBQcm9taXNlXG4gICAgLnRoZW4oY2FsbGJhY2spOyBcbn1cblxuZnVuY3Rpb24gbG9hZFNvdW5kcyhidWZmZXJzKSB7XG4gICAgbG9hZFNvdW5kSW50b0J1ZmZlcnMoYnVmZmVycywgaW5pdCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVN5bnRocygpIHtcbiAgICBzYW1wbGVTeW50aHMgPSBbXTtcbn1cblxuZnVuY3Rpb24gcGxheVNvdW5kKGluZGV4KSB7XG4gICAgc2FtcGxlU3ludGhzW2luZGV4IC0gMV0uc3RhcnRUcmlnZ2VyKCk7XG59XG5cbmZ1bmN0aW9uIHN0b3BTb3VuZChpbmRleCkge1xuICAgIHNhbXBsZVN5bnRoc1tpbmRleCAtIDFdLnN0b3BUcmlnZ2VyKCk7XG59XG5cbmZ1bmN0aW9uIHN0b3BBbGxTb3VuZHMoKSB7XG4gICAgLy8gVE9ETyBpZiBuZWVkZWRcbn1cblxuXG5cbmV4cG9ydCB7IGxvYWRTb3VuZHMsIHBsYXlTb3VuZCwgc3RvcFNvdW5kLCBzdG9wQWxsU291bmRzfTtcblxuXG4iXX0=