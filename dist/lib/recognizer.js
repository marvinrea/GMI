'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recognizer = function () {
	function Recognizer() {
		(0, _classCallCheck3.default)(this, Recognizer);

		this.trainingData = [];
		this.trainingLabels = [];
	}

	(0, _createClass3.default)(Recognizer, [{
		key: 'fit',
		value: function fit(dataset) {
			this.trainingData = dataset.getGestures();
			this.trainingLabels = dataset.getLabels();
		}
	}, {
		key: 'transform',
		value: function transform(data) {
			data = utils.scale(data);
			data = utils.resample(data, 40);
			data = utils.translateToOrigin(data);

			return data;
		}

		// Gesture recognizer

	}, {
		key: 'predict',
		value: function predict(data) {
			var minDistance = Infinity;
			var minIndex = 0;

			for (var i = 0; i < this.trainingData.length; i++) {
				var template = this.transform(this.trainingData[i]);
				var test = this.transform(data);

				var dist = 0.0;

				for (var j = 0; j < 2; j++) {
					for (var l = 0; l < 11; l++) {
						for (var k = 0; k < Math.min(template.length, data.length); k++) {
							if (test != undefined && template != undefined) dist = dist + utils.distance(template[k], test[k]);
						}
						if (dist < minDistance) {
							minDistance = dist;
							minIndex = i;
						}
					}
					test = utils.reverse(test);
				}
			}
			return this.trainingLabels[minIndex];
		}

		// Check which icons are in the rectangle

	}, {
		key: 'select',
		value: function select(rectangle, itemX, itemY) {
			var selection = [];

			var xmin = 2;
			var xmax = -1;
			var ymin = 2;
			var ymax = -1;

			for (var k = 0; k < rectangle.length; k++) {
				var datax = rectangle[k][0];
				var datay = rectangle[k][1];

				if (datax < xmin) xmin = datax;
				if (datax > xmax) xmax = datax;
				if (datay < ymin) ymin = datay;
				if (datay > ymax) ymax = datay;
			}

			for (var i = 0; i < itemX.length; i++) {
				for (var j = 0; j < itemY.length; j++) {
					if (itemY[j] + 50 <= ymax * 784) if (xmin * 484 < itemX[i]) if (xmax * 484 > itemX[i] + 42) if (ymin * 784 < itemY[j]) selection.push(i + 1 + j * 4);
				}
			}
			return selection;
		}
	}, {
		key: 'move_partition',
		value: function move_partition(gesture, x, lx) {
			var ngesture = gesture;

			for (var i = 0; i < ngesture.length; i++) {
				ngesture[i][0] += x - lx;
			}
			return ngesture;
		}
	}]);
	return Recognizer;
}(); /**
      * Recognizer class
      * Simple template-based recognizer
      */

exports.default = Recognizer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29nbml6ZXIuanMiXSwibmFtZXMiOlsidXRpbHMiLCJSZWNvZ25pemVyIiwidHJhaW5pbmdEYXRhIiwidHJhaW5pbmdMYWJlbHMiLCJkYXRhc2V0IiwiZ2V0R2VzdHVyZXMiLCJnZXRMYWJlbHMiLCJkYXRhIiwic2NhbGUiLCJyZXNhbXBsZSIsInRyYW5zbGF0ZVRvT3JpZ2luIiwibWluRGlzdGFuY2UiLCJJbmZpbml0eSIsIm1pbkluZGV4IiwiaSIsImxlbmd0aCIsInRlbXBsYXRlIiwidHJhbnNmb3JtIiwidGVzdCIsImRpc3QiLCJqIiwibCIsImsiLCJNYXRoIiwibWluIiwidW5kZWZpbmVkIiwiZGlzdGFuY2UiLCJyZXZlcnNlIiwicmVjdGFuZ2xlIiwiaXRlbVgiLCJpdGVtWSIsInNlbGVjdGlvbiIsInhtaW4iLCJ4bWF4IiwieW1pbiIsInltYXgiLCJkYXRheCIsImRhdGF5IiwicHVzaCIsImdlc3R1cmUiLCJ4IiwibHgiLCJuZ2VzdHVyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQTs7SUFBWUEsSzs7Ozs7O0lBR05DLFU7QUFFSix1QkFBYztBQUFBOztBQUNaLE9BQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDSCxPQUFLQyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0U7Ozs7c0JBRUdDLE8sRUFBUztBQUNkLFFBQUtGLFlBQUwsR0FBb0JFLFFBQVFDLFdBQVIsRUFBcEI7QUFDQSxRQUFLRixjQUFMLEdBQXNCQyxRQUFRRSxTQUFSLEVBQXRCO0FBQ0U7Ozs0QkFFU0MsSSxFQUFNO0FBQ1pBLFVBQU9QLE1BQU1RLEtBQU4sQ0FBWUQsSUFBWixDQUFQO0FBQ0FBLFVBQU9QLE1BQU1TLFFBQU4sQ0FBZUYsSUFBZixFQUFvQixFQUFwQixDQUFQO0FBQ0FBLFVBQU9QLE1BQU1VLGlCQUFOLENBQXdCSCxJQUF4QixDQUFQOztBQUVBLFVBQU9BLElBQVA7QUFDSDs7QUFFRDs7OzswQkFDUUEsSSxFQUFNO0FBQ2IsT0FBSUksY0FBY0MsUUFBbEI7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LEVBQVksQ0FBWixLQUFrQjBCLElBQUlDLEVBQXRCO0FBQ0E7QUFDRCxVQUFPQyxRQUFQO0FBQ0E7OztLQWpHSDs7Ozs7a0JBb0dlekMsVSIsImZpbGUiOiJyZWNvZ25pemVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZWNvZ25pemVyIGNsYXNzXG4gKiBTaW1wbGUgdGVtcGxhdGUtYmFzZWQgcmVjb2duaXplclxuICovXG5cbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXG5cblxuY2xhc3MgUmVjb2duaXplciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50cmFpbmluZ0RhdGEgPSBbXTtcblx0dGhpcy50cmFpbmluZ0xhYmVscyA9IFtdO1xuICB9XG5cbiAgZml0KGRhdGFzZXQpIHtcblx0dGhpcy50cmFpbmluZ0RhdGEgPSBkYXRhc2V0LmdldEdlc3R1cmVzKCk7XG5cdHRoaXMudHJhaW5pbmdMYWJlbHMgPSBkYXRhc2V0LmdldExhYmVscygpO1xuICB9XG4gIFxuICB0cmFuc2Zvcm0oZGF0YSkgeyAgICAgIFxuICAgICAgZGF0YSA9IHV0aWxzLnNjYWxlKGRhdGEpO1xuICAgICAgZGF0YSA9IHV0aWxzLnJlc2FtcGxlKGRhdGEsNDApO1xuICAgICAgZGF0YSA9IHV0aWxzLnRyYW5zbGF0ZVRvT3JpZ2luKGRhdGEpO1xuICAgICAgXG4gICAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8vIEdlc3R1cmUgcmVjb2duaXplclxuICBwcmVkaWN0KGRhdGEpIHtcblx0ICBsZXQgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcblx0ICBsZXQgbWluSW5kZXggPSAwO1xuXHQgIFxuICAgIGZvciAobGV0IGk9MDsgaSA8IHRoaXMudHJhaW5pbmdEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLnRyYW5zZm9ybSh0aGlzLnRyYWluaW5nRGF0YVtpXSk7XG4gICAgICBsZXQgdGVzdCA9IHRoaXMudHJhbnNmb3JtKGRhdGEpO1xuICAgICBcbiAgICAgIGxldCBkaXN0ID0gMC4wO1xuICAgICAgXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDI7IGorKykge1xuXHRcdCAgZm9yIChsZXQgbCA9IDA7IGwgPCAxMTsgbCsrKSB7XG5cdFx0XHQgIGZvciAobGV0IGs9MDsgayA8IE1hdGgubWluKHRlbXBsYXRlLmxlbmd0aCwgZGF0YS5sZW5ndGgpOyBrKyspIHtcblx0XHRcdFx0ICBpZih0ZXN0ICE9IHVuZGVmaW5lZCAmJiB0ZW1wbGF0ZSAhPSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0ZGlzdCA9IGRpc3QgKyB1dGlscy5kaXN0YW5jZSh0ZW1wbGF0ZVtrXSwgdGVzdFtrXSk7XG5cdFx0XHQgIH1cblx0XHRcdCAgaWYoZGlzdCA8IG1pbkRpc3RhbmNlKSB7XG5cdFx0XHRcdCAgbWluRGlzdGFuY2UgPSBkaXN0O1xuXHRcdFx0XHQgIG1pbkluZGV4ID0gaTtcblx0XHRcdCAgfVxuXHRcdCAgfVxuXHRcdCAgdGVzdCA9IHV0aWxzLnJldmVyc2UodGVzdCk7XG5cdCAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudHJhaW5pbmdMYWJlbHNbbWluSW5kZXhdO1xuICB9XG4gIFxuICAvLyBDaGVjayB3aGljaCBpY29ucyBhcmUgaW4gdGhlIHJlY3RhbmdsZVxuICBzZWxlY3QocmVjdGFuZ2xlLCBpdGVtWCwgaXRlbVkpIHtcblx0ICBsZXQgc2VsZWN0aW9uID0gW107XG5cdCAgXG5cdCAgbGV0IHhtaW4gPSAyO1xuXHQgIGxldCB4bWF4ID0gLTE7XG5cdCAgbGV0IHltaW4gPSAyO1xuXHQgIGxldCB5bWF4ID0gLTE7XG5cdCAgXG5cdCAgZm9yKGxldCBrID0gMDsgayA8IHJlY3RhbmdsZS5sZW5ndGg7IGsrKykge1xuXHRcdCAgbGV0IGRhdGF4ID0gcmVjdGFuZ2xlW2tdWzBdO1xuXHRcdCAgbGV0IGRhdGF5ID0gcmVjdGFuZ2xlW2tdWzFdO1xuXHRcdCAgXG5cdFx0ICBpZiAoZGF0YXggPCB4bWluKVxuXHRcdFx0eG1pbiA9IGRhdGF4O1xuXHRcdCAgaWYgKGRhdGF4ID4geG1heClcblx0XHRcdHhtYXggPSBkYXRheDtcblx0XHQgIGlmIChkYXRheSA8IHltaW4pXG5cdFx0XHR5bWluID0gZGF0YXk7XG5cdFx0ICBpZiAoZGF0YXkgPiB5bWF4KVxuXHRcdCAgICB5bWF4ID0gZGF0YXk7XG5cdCAgfVxuXHQgIFxuXHQgIGZvcihsZXQgaSA9IDA7IGkgPCBpdGVtWC5sZW5ndGg7IGkrKykge1xuXHRcdCAgZm9yKGxldCBqPTA7IGogPCBpdGVtWS5sZW5ndGg7IGorKylcdFx0ICBcblx0XHRcdGlmKGl0ZW1ZW2pdICsgNTAgPD0geW1heCo3ODQpXG5cdFx0XHQgIGlmKHhtaW4qNDg0IDwgaXRlbVhbaV0pXG5cdFx0XHRcdGlmKHhtYXgqNDg0ID4gaXRlbVhbaV0gKyA0Milcblx0XHRcdFx0ICBpZih5bWluKjc4NCA8IGl0ZW1ZW2pdKVxuXHRcdFx0XHRcdHNlbGVjdGlvbi5wdXNoKGkrMStqKjQpO1xuXHQgIH1cblx0ICByZXR1cm4gc2VsZWN0aW9uO1xuICB9XG4gIFxuICBtb3ZlX3BhcnRpdGlvbihnZXN0dXJlLCB4LCBseCkge1xuXHQgIGxldCBuZ2VzdHVyZSA9IGdlc3R1cmU7XG5cdCAgXG5cdCAgZm9yKGxldCBpID0gMDsgaSA8IG5nZXN0dXJlLmxlbmd0aDsgaSsrKXtcblx0XHQgIG5nZXN0dXJlW2ldWzBdICs9IHggLSBseDtcblx0ICB9XG5cdCAgcmV0dXJuIG5nZXN0dXJlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY29nbml6ZXI7XG4iXX0=