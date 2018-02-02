/**
 * Dataset Class
 */

class Dataset {

  constructor () {
    this.gesture = []
    this.allGestures = [];
    this.allLabels = [];
  }

  addGestureWithLabel(gesture, label) {
    this.allGestures.push(gesture);
    this.allLabels.push(label);
  }

  getNumGestures() {
    return this.allGestures.length;
  }

  getCurrentGesture() {
    return this.gesture;
  }

  getGestures() {
    return this.allGestures;
  }

  getLabels() {
    return this.allLabels;
  }

  clear() {
    this.allGestures = [];
    this.allLabels = [];
    // clear plots if there is any
    document.getElementById("dataset-div").remove();
    let datasetDiv = document.createElement('div');
    datasetDiv.id = "dataset-div";
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(datasetDiv);
  }

  plotDatasetInHML() {
    document.getElementById("dataset-div").remove();
    let datasetDiv = document.createElement('div');
    datasetDiv.id = "dataset-div";
    datasetDiv.className = "thumbnail";

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(datasetDiv);

    let classes = this.allLabels.filter((v, i, a) => a.indexOf(v) === i);

    //for (let g = 0; g < this.allGestures.length; g++) {
     for (let g = 0; g < classes.length; g++) {
       let index = this.allLabels.indexOf(classes[g]);
      const gesture_ = this.allGestures[index]
      //const gesture_ = this.allGestures[g]
      // declare the canva where to draw a thumbnail
      let thumbCnvs = document.createElement('canvas');
      thumbCnvs.width = 70;
      thumbCnvs.height = 70;
      thumbCnvs.style.border = "1px solid";
      // get context to fill with bkg color and image
      let ctx = thumbCnvs.getContext('2d');
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, thumbCnvs.width, thumbCnvs.height); 
      for (let n = 0; n < gesture_.length; n++) {
        if (n == 0)  {
          ctx.beginPath();
          ctx.fillStyle = "orange";
          const x = gesture_[n][0] * 70;
          const y = gesture_[n][1] * 70;
          ctx.arc(x, y, 5, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.closePath();
        } else {
          const curX = gesture_[n][0] * 70;
          const curY = gesture_[n][1] * 70;
          const prevX = gesture_[n-1][0] * 70;
          const prevY = gesture_[n-1][1] * 70;
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
      let textSpan = document.createElement('span');
      textSpan.innerHTML += String(this.allLabels[g]);
      textSpan.className = "thumbLabel"
      datasetDiv.appendChild(textSpan);
    }
  }
}

export default Dataset;
