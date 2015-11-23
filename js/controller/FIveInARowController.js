FiveInARowController = function(model, view) {
	this.model = model;
	this.view = view;
}

FiveInARowController.prototype.run = function() {
	for (let cell of model.cells) {
		view.drawCell(cell);
	}
}