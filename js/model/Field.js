Field = function(size) {
	this.cells = [];
	for (var i=0; i<size; i++) {
		for (var j=0; j<size; j++) {
			cells.push(new Cell(i, j));
		}
	}
}