
/// "PRIVATE" FUNCTIONS

function pathLength(points)
{
    var d = 0.0;
    for (var i = 1; i < points.length; i++)
        d += distance(points[i - 1], points[i]);
    return d;
}

function boundingBox(points)
{
    let minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
    for (let i = 0; i < points.length; i++) {
        minX = Math.min(minX, points[i][0]);
        minY = Math.min(minY, points[i][1]);
        maxX = Math.max(maxX, points[i][0]);
        maxY = Math.max(maxY, points[i][1]);
    }
    return [maxX - minX, maxY - minY];
}

function centroid(points)
{
    var x = 0.0, y = 0.0;
    for (var i = 0; i < points.length; i++) {
        x += points[i][0];
        y += points[i][1];
    }
    x /= points.length;
    y /= points.length;
    return [x, y];
}
function indicativeAngle(points)
{
    var c = centroid(points);
    return Math.atan2(c[1] - points[0][1], c[0] - points[0][0]);
}


/// "PUBLIC" FUNCTIONS

function distance(vector1, vector2) {
	let dist = 0.0;
	
	if(undefined != vector1 && undefined != vector2){
		for (let d =0; d < vector1.length; d++) {
			dist += Math.pow(vector1[d] - vector2[d], 2);
		}
	}
	return Math.sqrt(dist);
}

function resample(data_, n)
{   
    let data = data_;
    let I = pathLength(data) / (n - 1); // interval length
    let D = 0.0;
    let newpoints = [];
    newpoints.push(data[0])
    for (let i = 1; i < data.length; i++)
    {
        let d = distance(data[i - 1], data[i]);
        if ((D + d) >= I)
        {
            let qx = data[i - 1][0] + ((I - D) / d) * (data[i][0] - data[i - 1][0]);
            let qy = data[i - 1][1] + ((I - D) / d) * (data[i][1] - data[i - 1][1]);
            let q = [qx, qy];
            newpoints.push([qx, qy]);
            data.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
            D = 0.0;
        }
        else D += d;
    }
    if (newpoints.length == n - 1) {
        newpoints.push([data[data.length - 1][0], data[data.length - 1][1]]);
    }
    return newpoints;
}


function rotate(points) // rotates points around centroid
{
    let radians = 0.523;
    let c = centroid(points);
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    let newpoints = [];
    for (let i = 0; i < points.length; i++) {
        let qx = (points[i][0] - c[0]) * cos - (points[i][1] - c[1]) * sin + c[0]
        let qy = (points[i][0] - c[0]) * sin + (points[i][1] - c[1]) * cos + c[1];
        newpoints.push([qx, qy]);
    }
    return newpoints;
}


function scale(points) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
    let size = 500;
    let bBox = boundingBox(points);
    let newpoints = [];
    for (let i = 0; i < points.length; i++) {
        let qx = points[i][0] * (size / bBox[0]);
        let qy = points[i][1] * (size / bBox[1]);
        newpoints.push([qx, qy]);
    }
    return newpoints;
}

function translateToOrigin(points) // translates points' centroid
{
    const orig = [0, 0];
    const c = centroid(points);
    let newpoints = [];
    for (let i = 0; i < points.length; i++) {
        let qx = points[i][0] + orig[0] - c[0];
        let qy = points[i][1] + orig[1] - c[1];
        newpoints.push([qx, qy]);
    }
    return newpoints;
}

function reverse(points)
{
	let newpoints = [];
	for(let i = points.length - 1; i >= 0; i--) {
		let nx = points[i][0];
		let ny = points[i][1];
		newpoints.push([nx,ny]);
	}	
	return newpoints;
}


export { distance, resample, rotate, scale, translateToOrigin, reverse };
