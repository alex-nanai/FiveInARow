$(document).ready(function () {
	var view = new FiveInARowView("#gameField");
	var controller = new FiveInARowController(view);

	controller.run();
});

Config = {
    size: 5,
    cellSizePx: 50
}

CellModel = function(x, y)  {
	this.ContentOption = {
		EMPTY: "",
		X: "X",
		O: "O"
	};

	this.content = this.ContentOption.EMPTY;
	this.x = x;
	this.y = y;
}

CellController = function(model, view) {
    this.model = model;
    this.view = view;
}

CellController.prototype.run = function() {
    this.view.draw();
}

CellController.prototype.processClick = function() {
    if (this.model.content !== this.ContentOption.EMPTY) {
        return;
    }
    
    this.model.content = this.ContentOption.X;
    this.view.draw();
}

FiveInARowController = function(view) {
    this.view = view;
	this.cellControllers = []
    var i, j;
    for (i=0; i<Config.size; i++) {
        for (j=0; j<Config.size; j++) {
            var cellModel = new CellModel();
            var cellView = new CellView(i, j, view.drawContext, cellModel);
            this.cellControllers.push(new CellController(cellModel, cellView));
        }
    }
    
    this.view.registerClickWatcher(this.processClick);
}

FiveInARowController.prototype.run = function() {
    this.view.draw();
    
	this.cellControllers.forEach(function (c) {
		c.run();
	});
};

FiveInARowController.prototype.processClick = function(logicalX, logicalY) {
    this.cellControllers[logicalX*Config.size + logicalY].processClick(logicalX, logicalY);
}

CellView = function (x, y, context, model) {
    this.x = x;
    this.y = y;
	this.context = context;
	this.model = model;
}

CellView.prototype.draw = function() {
	this.context.fillStyle = "blue";
	this.context.font = "bold 16px Arial";
	this.context.fillText(this.model.content, this.x * Config.cellSizePx, this.y * Config.cellSizePx);
}

FiveInARowView = function(canvasSelector) {
    this.fullSize = Config.size * Config.cellSizePx;
    $(canvasSelector)[0].height = this.fullSize;
    $(canvasSelector)[0].width = this.fullSize;
    this.canvasSelector = canvasSelector;
    this.drawContext = $(this.canvasSelector)[0].getContext('2d');
    $(canvasSelector).click(clickHandler);
    
    this.clickWatchers = [];
}

FiveInARowView.prototype.draw = function() {
    var i;
    for (i = 0; i <= Config.size; i++) {
        var stepPx = i * Config.cellSizePx;
        this.drawContext.moveTo(0, stepPx);
        this.drawContext.lineTo(this.fullSize, stepPx);
        this.drawContext.moveTo(stepPx, 0);
        this.drawContext.lineTo(stepPx, this.fullSize);
    }
    this.drawContext.stroke();
}

FiveInARowView.prototype.notifyClickWatchers = function(logicalX, logicalY) {
    this.clickWatchers.forEach(function(callback) {
        callback(logicalX, logicalY)
    });
}

FiveInARowView.prototype.registerClickWatcher = function(callback) {
    this.clickWatchers.push(callback);
}

function clickHandler(e) {
    // how to map this to view object?
    
    var posX = $(this).offset().left;
    var posY = $(this).offset().top;
    
    var logicalX = parseInt((e.pageX - posX) / Config.cellSizePx, 10);
    var logicalY = parseInt((e.pageY - posY) / Config.cellSizePx, 10);
    
    this.notifyClickWatchers(logicalX, logicalY);
}