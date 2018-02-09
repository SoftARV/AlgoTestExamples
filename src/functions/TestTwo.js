const basinChars = "abcdefghijklmnopqrstuvwxyz";

export default TestTwo = function(input){
	var jcases = parseCases(input);
	
	for(var i=0;i<jcases.length;i++){
		solveCase(jcases[i]);
	}
	
	var output = '';
  output = printCases(output, jcases);
	
	return output;
}

parseCases = function(input){
	var lines = input.split('\n');
	
	var numCases = lines[0];
	var i=1;
	var jcases = [];
	while(jcases.length<numCases){
		var jcase = {};
		jcases[jcases.length] = jcase;
		var dims = lines[i].split(' ');
		jcase.ybound = parseInt(dims[0]);
		jcase.xbound = parseInt(dims[1]);
		
		i++;
    jcase.points = [];
    
		for(var x=0;x<jcase.xbound;x++){
			jcase.points[x] = [];
		}
		for(var j=0;j<jcase.ybound;j++){
			var xline = lines[i+j];
			var alts = xline.split(' ');
			for(var k=0;k<alts.length;k++){
				jcase.points[k][j] = {alt:parseInt(alts[k])};
			}
		}
		i=i+jcase.ybound;
	}
	return jcases;
}

solveCase = function(jcase){
	linkPoints(jcase);
	jcase.curBasin = 0;
	
	for(var y=0;y<jcase.ybound;y++){
		for(var x=0;x<jcase.xbound;x++){
			findBasinXY(jcase, x, y);
		}
	}
	var test = 1;
}

linkPoints = function(jcase){
	for(var y=0;y<jcase.ybound;y++){
		for(var x=0;x<jcase.xbound;x++){
			var point = jcase.points[x][y];
			if(x==0) point.west=null; else point.west = jcase.points[x-1][y];
			if(x==(jcase.xbound-1)) point.east=null; else point.east = jcase.points[x+1][y];
			if(y==0) point.north=null; else point.north = jcase.points[x][y-1];
			if(y==(jcase.ybound-1)) point.south = null; else point.south = jcase.points[x][y+1];
		}
	}
}

getNextBasin = function(jcase){
	var basin = basinChars.charAt(jcase.curBasin);
	jcase.curBasin++;
	return basin;
}

findBasinXY = function(jcase, x, y){
	var point = jcase.points[x][y];
	return findBasin(jcase, point);
}

findBasin = function(jcase, point){
	if(point.basin != null) return point.basin;
	
	var sink = point;
	sink = testSink(sink, point.north);
	sink = testSink(sink, point.west);
	sink = testSink(sink, point.east);
	sink = testSink(sink, point.south);
	
	if(sink == point){
		var basin = getNextBasin(jcase);
		point.basin = basin;
	}
	else{
		point.basin = findBasin(jcase, sink);
	}
	
	return point.basin;
}

testSink = function(sink, point){
	if(point != null && point.alt < sink.alt) return point;
	return sink;
}

printCases = function(output, jcases){
	for(var i=0;i<jcases.length;i++){
		output = output + `Case #${(i+1)}:\n`;
		output = printCase(output, jcases[i]);
	}
	return output;
};

printCase = function(output, jcase){
	for(var y=0;y<jcase.ybound;y++){
		for(var x=0;x<jcase.xbound;x++){
			output = output + jcase.points[x][y].basin;
			if(x < (jcase.xbound-1)) output = output + ' ';
		}
		output = output + '\n'; 
	}
	return output;
}
