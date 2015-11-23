Cell = function(column, row)  {
	this.ContentOption = {
		EMPTY = "",
		X = "X",
		O = "O"
	};

	this.content = ContentOption.EMPTY;
	this.column = column;
	this.row = row;
}