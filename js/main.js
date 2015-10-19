$(document).ready(function () {
	var view = new FiveInARowView("#gameField");
	var controller = new FiveInARowController(view);

	controller.run();
});

FiveInARowController = function(view) {
	this.view = view;
}

FiveInARowController.prototype.run = function() {
	this.view.drawField();
}

FiveInARowView = function(canvasSelector) {
	this.config = {
		height = 150,
		width = 150,
		cellHeight = 50,
		cellWidth = 50
	};
	$(canvasSelector).
	this.drawContext = $(canvasSelector)[0].getContext('2d');
}

FiveInARowView.prototype.drawField = function() {
	this.drawContext.fillStyle = "#FF0000";
	this.drawContext.fillRect(0,0,150,75);
}

drawField = function(ctx) {
	var fieldStep = 50;

}