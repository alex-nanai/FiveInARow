$(document).ready(function () {
	var view = new FiveInARowView("#gameField");
	var model = new Field(5);
	var controller = new FiveInARowController(model, view);

	controller.run();
});