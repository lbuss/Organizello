TrelloClone.Views.CardsShow = Backbone.CompositeView.extend({
	template: JST["cards/show"],

	events: {
		'dropCard' : 'drop'
	},

	drop: function(event, index) {
		this.$el.trigger('update-cards', [this.model, index]);
	},
  
	render: function(){
		var renderedView = this.template({
			card: this.model
		});
		this.$el.html(renderedView);
		return this;
	}
  
});