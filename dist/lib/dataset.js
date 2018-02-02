"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dataset Class
 */

var Dataset = function () {
  function Dataset() {
    (0, _classCallCheck3.default)(this, Dataset);

    this.gesture = [];
    this.allGestures = [];
    this.allLabels = [];
  }

  (0, _createClass3.default)(Dataset, [{
    key: "addGestureWithLabel",
    value: function addGestureWithLabel(gesture, label) {
      this.allGestures.push(gesture);
      this.allLabels.push(label);
    }
  }, {
    key: "getNumGestures",
    value: function getNumGestures() {
      return this.allGestures.length;
    }
  }, {
    key: "getCurrentGesture",
    value: function getCurrentGesture() {
      return this.gesture;
    }
  }, {
    key: "getGestures",
    value: function getGestures() {
      return this.allGestures;
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      return this.allLabels;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.allGestures = [];
      this.allLabels = [];
      // clear plots if there is any
      document.getElementById("dataset-div").remove();
      var datasetDiv = document.createElement('div');
      datasetDiv.id = "dataset-div";
      var body = document.getElementsByTagName("body")[0];
      body.appendChild(datasetDiv);
    }
  }, {
    key: "plotDatasetInHML",
    value: function plotDatasetInHML() {
      document.getElementById("dataset-div").remove();
      var datasetDiv = document.createElement('div');
      datasetDiv.id = "dataset-div";
      datasetDiv.className = "thumbnail";

      var body = document.getElementsByTagName("body")[0];
      body.appendChild(datasetDiv);

      var classes = this.allLabels.filter(function (v, i, a) {
        return a.indexOf(v) === i;
      });

      //for (let g = 0; g < this.allGestures.length; g++) {
      for (var g = 0; g < classes.length; g++) {
        var index = this.allLabels.indexOf(classes[g]);
        var gesture_ = this.allGestures[index];
        //const gesture_ = this.allGestures[g]
        // declare the canva where to draw a thumbnail
        var thumbCnvs = document.createElement('canvas');
        thumbCnvs.width = 70;
        thumbCnvs.height = 70;
        thumbCnvs.style.border = "1px solid";
        // get context to fill with bkg color and image
        var ctx = thumbCnvs.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, thumbCnvs.width, thumbCnvs.height);
        for (var n = 0; n < gesture_.length; n++) {
          if (n == 0) {
            ctx.beginPath();
            ctx.fillStyle = "orange";
            var x = gesture_[n][0] * 70;
            var y = gesture_[n][1] * 70;
            ctx.arc(x, y, 5, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
          } else {
            var curX = gesture_[n][0] * 70;
            var curY = gesture_[n][1] * 70;
            var prevX = gesture_[n - 1][0] * 70;
            var prevY = gesture_[n - 1][1] * 70;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(curX, curY);
            ctx.strokeStyle = "orange";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();
          }
        }
        datasetDiv.appendChild(thumbCnvs);
        var textSpan = document.createElement('span');
        textSpan.innerHTML += String(this.allLabels[g]);
        textSpan.className = "thumbLabel";
        datasetDiv.appendChild(textSpan);
      }
    }
  }]);
  return Dataset;
}();

exports.default = Dataset;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFzZXQuanMiXSwibmFtZXMiOlsiRGF0YXNldCIsImdlc3R1cmUiLCJhbGxHZXN0dXJlcyIsImFsbExhYmVscyIsImxhYmVsIiwicHVzaCIsImxlbmd0aCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJkYXRhc2V0RGl2IiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJjbGFzc05hbWUiLCJjbGFzc2VzIiwiZmlsdGVyIiwidiIsImkiLCJhIiwiaW5kZXhPZiIsImciLCJpbmRleCIsImdlc3R1cmVfIiwidGh1bWJDbnZzIiwid2lkdGgiLCJoZWlnaHQiLCJzdHlsZSIsImJvcmRlciIsImN0eCIsImdldENvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIm4iLCJiZWdpblBhdGgiLCJ4IiwieSIsImFyYyIsIk1hdGgiLCJQSSIsImZpbGwiLCJjbG9zZVBhdGgiLCJjdXJYIiwiY3VyWSIsInByZXZYIiwicHJldlkiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2VTdHlsZSIsImxpbmVXaWR0aCIsInN0cm9rZSIsInRleHRTcGFuIiwiaW5uZXJIVE1MIiwiU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFJTUEsTztBQUVKLHFCQUFlO0FBQUE7O0FBQ2IsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNEOzs7O3dDQUVtQkYsTyxFQUFTRyxLLEVBQU87QUFDbEMsV0FBS0YsV0FBTCxDQUFpQkcsSUFBakIsQ0FBc0JKLE9BQXRCO0FBQ0EsV0FBS0UsU0FBTCxDQUFlRSxJQUFmLENBQW9CRCxLQUFwQjtBQUNEOzs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLRixXQUFMLENBQWlCSSxNQUF4QjtBQUNEOzs7d0NBRW1CO0FBQ2xCLGFB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RSxDQUFYLEVBQWMsQ0FBZCxJQUFtQixFQUFqQztBQUNBLGdCQUFNWSxRQUFRdEIsU0FBU1UsSUFBRSxDQUFYLEVBQWMsQ0FBZCxJQUFtQixFQUFqQztBQUNBSixnQkFBSUssU0FBSjtBQUNBTCxnQkFBSWlCLE1BQUosQ0FBV0YsS0FBWCxFQUFrQkMsS0FBbEI7QUFDQWhCLGdCQUFJa0IsTUFBSixDQUFXTCxJQUFYLEVBQWlCQyxJQUFqQjtBQUNBZCxnQkFBSW1CLFdBQUosR0FBa0IsUUFBbEI7QUFDQW5CLGdCQUFJb0IsU0FBSixHQUFnQixDQUFoQjtBQUNBcEIsZ0JBQUlxQixNQUFKO0FBQ0FyQixnQkFBSVksU0FBSjtBQUNEO0FBQ0Y7QUFDRGpDLG1CQUFXSyxXQUFYLENBQXVCVyxTQUF2QjtBQUNBLFlBQUkyQixXQUFXOUMsU0FBU0ksYUFBVCxDQUF1QixNQUF2QixDQUFmO0FBQ0EwQyxpQkFBU0MsU0FBVCxJQUFzQkMsT0FBTyxLQUFLcEQsU0FBTCxDQUFlb0IsQ0FBZixDQUFQLENBQXRCO0FBQ0E4QixpQkFBU3JDLFNBQVQsR0FBcUIsWUFBckI7QUFDQU4sbUJBQVdLLFdBQVgsQ0FBdUJzQyxRQUF2QjtBQUNEO0FBQ0Y7Ozs7O2tCQUdZckQsTyIsImZpbGUiOiJkYXRhc2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXRhc2V0IENsYXNzXG4gKi9cblxuY2xhc3MgRGF0YXNldCB7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZ2VzdHVyZSA9IFtdXG4gICAgdGhpcy5hbGxHZXN0dXJlcyA9IFtdO1xuICAgIHRoaXMuYWxsTGFiZWxzID0gW107XG4gIH1cblxuICBhZGRHZXN0dXJlV2l0aExhYmVsKGdlc3R1cmUsIGxhYmVsKSB7XG4gICAgdGhpcy5hbGxHZXN0dXJlcy5wdXNoKGdlc3R1cmUpO1xuICAgIHRoaXMuYWxsTGFiZWxzLnB1c2gobGFiZWwpO1xuICB9XG5cbiAgZ2V0TnVtR2VzdHVyZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWxsR2VzdHVyZXMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0Q3VycmVudEdlc3R1cmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VzdHVyZTtcbiAgfVxuXG4gIGdldEdlc3R1cmVzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbEdlc3R1cmVzO1xuICB9XG5cbiAgZ2V0TGFiZWxzKCkge1xuICAgIHJldHVybiB0aGlzLmFsbExhYmVscztcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuYWxsR2VzdHVyZXMgPSBbXTtcbiAgICB0aGlzLmFsbExhYmVscyA9IFtdO1xuICAgIC8vIGNsZWFyIHBsb3RzIGlmIHRoZXJlIGlzIGFueVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0YXNldC1kaXZcIikucmVtb3ZlKCk7XG4gICAgbGV0IGRhdGFzZXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkYXRhc2V0RGl2LmlkID0gXCJkYXRhc2V0LWRpdlwiO1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZGF0YXNldERpdik7XG4gIH1cblxuICBwbG90RGF0YXNldEluSE1MKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0YXNldC1kaXZcIikucmVtb3ZlKCk7XG4gICAgbGV0IGRhdGFzZXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkYXRhc2V0RGl2LmlkID0gXCJkYXRhc2V0LWRpdlwiO1xuICAgIGRhdGFzZXREaXYuY2xhc3NOYW1lID0gXCJ0aHVtYm5haWxcIjtcblxuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZGF0YXNldERpdik7XG5cbiAgICBsZXQgY2xhc3NlcyA9IHRoaXMuYWxsTGFiZWxzLmZpbHRlcigodiwgaSwgYSkgPT4gYS5pbmRleE9mKHYpID09PSBpKTtcblxuICAgIC8vZm9yIChsZXQgZyA9IDA7IGcgPCB0aGlzLmFsbEdlc3R1cmVzLmxlbmd0aDsgZysrKSB7XG4gICAgIGZvciAobGV0IGcgPSAwOyBnIDwgY2xhc3Nlcy5sZW5ndGg7IGcrKykge1xuICAgICAgIGxldCBpbmRleCA9IHRoaXMuYWxsTGFiZWxzLmluZGV4T2YoY2xhc3Nlc1tnXSk7XG4gICAgICBjb25zdCBnZXN0dXJlXyA9IHRoaXMuYWxsR2VzdHVyZXNbaW5kZXhdXG4gICAgICAvL2NvbnN0IGdlc3R1cmVfID0gdGhpcy5hbGxHZXN0dXJlc1tnXVxuICAgICAgLy8gZGVjbGFyZSB0aGUgY2FudmEgd2hlcmUgdG8gZHJhdyBhIHRodW1ibmFpbFxuICAgICAgbGV0IHRodW1iQ252cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgdGh1bWJDbnZzLndpZHRoID0gNzA7XG4gICAgICB0aHVtYkNudnMuaGVpZ2h0ID0gNzA7XG4gICAgICB0aHVtYkNudnMuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWRcIjtcbiAgICAgIC8vIGdldCBjb250ZXh0IHRvIGZpbGwgd2l0aCBia2cgY29sb3IgYW5kIGltYWdlXG4gICAgICBsZXQgY3R4ID0gdGh1bWJDbnZzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRodW1iQ252cy53aWR0aCwgdGh1bWJDbnZzLmhlaWdodCk7IFxuICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBnZXN0dXJlXy5sZW5ndGg7IG4rKykge1xuICAgICAgICBpZiAobiA9PSAwKSAge1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJvcmFuZ2VcIjtcbiAgICAgICAgICBjb25zdCB4ID0gZ2VzdHVyZV9bbl1bMF0gKiA3MDtcbiAgICAgICAgICBjb25zdCB5ID0gZ2VzdHVyZV9bbl1bMV0gKiA3MDtcbiAgICAgICAgICBjdHguYXJjKHgsIHksIDUsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjdXJYID0gZ2VzdHVyZV9bbl1bMF0gKiA3MDtcbiAgICAgICAgICBjb25zdCBjdXJZID0gZ2VzdHVyZV9bbl1bMV0gKiA3MDtcbiAgICAgICAgICBjb25zdCBwcmV2WCA9IGdlc3R1cmVfW24tMV1bMF0gKiA3MDtcbiAgICAgICAgICBjb25zdCBwcmV2WSA9IGdlc3R1cmVfW24tMV1bMV0gKiA3MDtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4Lm1vdmVUbyhwcmV2WCwgcHJldlkpO1xuICAgICAgICAgIGN0eC5saW5lVG8oY3VyWCwgY3VyWSk7XG4gICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJvcmFuZ2VcIjtcbiAgICAgICAgICBjdHgubGluZVdpZHRoID0gMjsgXG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGF0YXNldERpdi5hcHBlbmRDaGlsZCh0aHVtYkNudnMpO1xuICAgICAgbGV0IHRleHRTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgdGV4dFNwYW4uaW5uZXJIVE1MICs9IFN0cmluZyh0aGlzLmFsbExhYmVsc1tnXSk7XG4gICAgICB0ZXh0U3Bhbi5jbGFzc05hbWUgPSBcInRodW1iTGFiZWxcIlxuICAgICAgZGF0YXNldERpdi5hcHBlbmRDaGlsZCh0ZXh0U3Bhbik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFzZXQ7XG4iXX0=