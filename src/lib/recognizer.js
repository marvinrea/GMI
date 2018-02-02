/**
 * Recognizer class
 * Simple template-based recognizer
 */

import * as utils from './utils'


class Recognizer {

  constructor() {
    this.trainingData = [];
	this.trainingLabels = [];
  }

  fit(dataset) {
	this.trainingData = dataset.getGestures();
	this.trainingLabels = dataset.getLabels();
  }
  
  transform(data) {      
      data = utils.scale(data);
      data = utils.resample(data,40);
      data = utils.translateToOrigin(data);
      
      return data;
  }

  // Gesture recognizer
  predict(data) {
	  let minDistance = Infinity;
	  let minIndex = 0;
	  
    for (let i=0; i < this.trainingData.length; i++) {
      let template = this.transform(this.trainingData[i]);
      let test = this.transform(data);
     
      let dist = 0.0;
      
      for (let j = 0; j < 2; j++) {
		  for (let l = 0; l < 11; l++) {
			  for (let k=0; k < Math.min(template.length, data.length); k++) {
				  if(test != undefined && template != undefined)
					dist = dist + utils.distance(template[k], test[k]);
			  }
			  if(dist < minDistance) {
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
  select(rectangle, itemX, itemY) {
	  let selection = [];
	  
	  let xmin = 2;
	  let xmax = -1;
	  let ymin = 2;
	  let ymax = -1;
	  
	  for(let k = 0; k < rectangle.length; k++) {
		  let datax = rectangle[k][0];
		  let datay = rectangle[k][1];
		  
		  if (datax < xmin)
			xmin = datax;
		  if (datax > xmax)
			xmax = datax;
		  if (datay < ymin)
			ymin = datay;
		  if (datay > ymax)
		    ymax = datay;
	  }
	  
	  for(let i = 0; i < itemX.length; i++) {
		  for(let j=0; j < itemY.length; j++)		  
			if(itemY[j] + 50 <= ymax*784)
			  if(xmin*484 < itemX[i])
				if(xmax*484 > itemX[i] + 42)
				  if(ymin*784 < itemY[j])
					selection.push(i+1+j*4);
	  }
	  return selection;
  }
  
  move_partition(gesture, x, lx) {
	  let ngesture = gesture;
	  
	  for(let i = 0; i < ngesture.length; i++){
		  ngesture[i][0] += x - lx;
	  }
	  return ngesture;
  }
}

export default Recognizer;
