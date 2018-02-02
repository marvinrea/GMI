import * as draw from './lib/draw'
import Dataset from './lib/dataset'
import Recognizer from './lib/recognizer'
import * as images from './lib/images'

const $drawing = document.querySelector('#drawCan');

let letsDraw = false;
let currentGesture = [];
let gestureID = 12;
let trainingMode = false;
let firstDraw = false;

let itemx = [];
let itemy = [];
let iconID = [];
let part = [];
let coord = [[2,75,100],[1,175,100],[2,275,100],[2,375,100],
	[1,75,180],[3,175,180],[3,275,180],[1,375,180],
	[1,75,260],[2,175,260],[1,275,260],[3,375,260],
	[4,75,340],[4,175,340],[4,275,340],[4,375,340],
	[1,75,420],[3,175,420],[2,275,420],[1,375,420],
	[4,75,500],[4,175,500],[4,275,500],[4,375,500],
	[2,75,580],[1,175,580],[2,275,580],[2,375,580]];

let lx = 0.0;

let sort = false;
let sorted1 = false;
let sorted2 = false;
let partition = false;
let select = false;

let dataset = new Dataset();
let myRecognizer = new Recognizer();

window.onload = function(){
	myRecognizer.fit(dataset);
	
	images.init(dataset);
	images.drawImages($drawing.getContext("2d"));
	itemx = [75,175,275,375];
	itemy = [100,180,260,340,420,500,580];
};

// start when mouse is down
$drawing.addEventListener('mousedown', function(e) {
	
	if (e.clientY < 684 && e.clientY > 668){
		if(e.clientX > 208 && e.clientX < 225){ // "Type" box
			if(!sorted1){
				coord = images.sort('type');
				sorted1 = true;
			}
			else {
				coord = images.sort('dis-type');
				sorted1 = false;
			}
			images.drawImages($drawing.getContext("2d"));
			sort = true;
			letsDraw = false;
		}
		else if(e.clientX > 84 && e.clientX < 101){ // "Date" box
			if(!sorted2){
				coord = images.sort('date');
				sorted2 = true;
			}
			else {
				coord = images.sort('dis-date');
				sorted2 = false;
			}
			images.drawImages($drawing.getContext("2d"));
			sort = true;
			letsDraw = false;
		}
	}
	else{ // Selection
		if(select){
			draw.drawGesture($drawing, 'down', e);
			images.selection($drawing.getContext("2d"), iconID);
			
			const coordinates = draw.getMouseXYinCanvas($drawing, e);
			currentGesture.push(coordinates);
		}
		else { // Partition
			if(partition) {
				lx = draw.getMouseXYinCanvas($drawing, e)[0];
				images.draw_partition($drawing, iconID);
				draw.line_partition($drawing, currentGesture);
			}
			else { // Initial state
				draw.drawGesture($drawing, 'down', e);
				images.drawImages($drawing.getContext("2d"));
				
				const coordinates = draw.getMouseXYinCanvas($drawing, e);
				currentGesture.push(coordinates);
			}
		}
		letsDraw = true;
	}
	
	
});

// start when mouse is down and moving
$drawing.addEventListener('mousemove', function(e) {
	if (letsDraw && !sort){
		if(!partition){
			draw.drawGesture($drawing, 'move', e);
			const coordinates = draw.getMouseXYinCanvas($drawing, e);
			currentGesture.push(coordinates);
		}
		else {
			const x = draw.getMouseXYinCanvas($drawing, e)[0];
			currentGesture = myRecognizer.move_partition(currentGesture, x, lx);
			lx = x;
			
			part = images.partition(currentGesture, iconID);
			
			images.draw_partition($drawing, part, iconID);
			draw.line_partition($drawing, currentGesture);
		}
	}
});

// stop when mouse is up
$drawing.addEventListener('mouseup', function(e) {
	letsDraw = false;
	if(sort) {
		sort = false;
	}
	else {
		if(trainingMode) {
			dataset.addGestureWithLabel(currentGesture, gestureID);
			dataset.plotDatasetInHML();
			gestureID++;
		}
		else {
			if (partition) {
				part = images.partition(currentGesture, iconID);
				images.draw_partition($drawing, part, iconID);
				partition = false;
			}
			else {
				const predictedLabel = myRecognizer.predict(currentGesture);
				if(predictedLabel == 11){
					images.setCoordinates(coord);
					images.drawImages($drawing.getContext("2d"));
				}
				if(select){
					if(predictedLabel == 9 || predictedLabel == 10) {
						console.log("partition");
						part = images.partition(currentGesture, iconID);
						images.draw_partition($drawing, part, iconID);
						select = false;
						partition = true;
						draw.line_partition($drawing, currentGesture);
					}
				}
				else if(predictedLabel < 9 && predictedLabel > 0) {
					iconID = myRecognizer.select(currentGesture, itemx, itemy);
					if(iconID.length > 0) {
						images.selection($drawing.getContext("2d"), iconID);
						select = true;
						console.log("selection");
					}
				}
			}
		}
	}
	if(!partition)
		currentGesture = [];	
});
/*
// Buttons "Training" and "Testing"
const $trainingBtn = document.querySelector('#trainingBtn');
const $testingBtn = document.querySelector('#testingBtn');

$trainingBtn.addEventListener('click', function(e) {
	trainingMode = true;	
});

$testingBtn.addEventListener('click', function(e) {
	myRecognizer.fit(dataset);
	trainingMode = false;
});*/
