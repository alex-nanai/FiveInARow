FiveInARowView = function(canvasSelector) {
	this.drawContext = $(canvasSelector)[0].getContext('2d');
}

FiveInARowView.prototype.drawCell = function(cell) {
	console.log('draw');
}