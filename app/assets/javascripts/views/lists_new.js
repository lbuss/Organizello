TrelloClone.Views.ListsNew = Backbone.CompositeView.extend({
	template: JST["lists/new"],

	intialize: function(options){
		console.log(options);
		debugger;

	},

	events:{
		"submit form": "submitList"
	},

	render: function() {
		var renderedView = this.template();
		this.$el.html(renderedView);
		return this;
	},

	submitList: function(event) {
		event.preventDefault();
		var view = this;
		var params = $(event.currentTarget).serializeJSON();
		params.list.board_id = 4;
		var newList = new TrelloClone.Models.List(params["list"]);
		newList.save({}, {
			success: function() {
			view.model.lists().add(newList);
			view.render();
			}
		});
	}


	});