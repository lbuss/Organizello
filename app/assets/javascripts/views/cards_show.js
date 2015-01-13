TrelloClone.Views.CardsShow = Backbone.CompositeView.extend({
	template: JST["cards/show"],

	// tagName:"li",
	
	className: "card",
	
	initialize: function() {
		this.collection = this.model.items();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.collection, "sync", this.render);
	},

	events: {
		'click .delete.card': 'deleteCard',
		'dropCard': 'drop'
	},

	drop: function(event, index) {
		this.$el.trigger('update-cards', [this.model, index]);
	},
  
	render: function(){
		//clear bootstrap modal background, its bugged with backbone
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		
		var renderedView = this.template({
			card: this.model
		});
		this.$el.html(renderedView);
		
		var that = this;
		
		this.collection.forEach( function(item) {
			var itemView = new TrelloClone.Views.ItemsShow({
				model: item
			})
			that.$el.find(".items").append(itemView.render().$el);
		})
		
   	 	if(window.currentUser.id === this.model.collection.list.collection.board.get('user_id') || this.model.collection.list.collection.board.has_member(window.currentUser)){
			var itemNewView = new TrelloClone.Views.ItemsNew({model: this.model});
			that.$el.find(".newItem").append(itemNewView.render().$el);
		}
		
		return this;
	},
	
	deleteCard: function() {
	  if (confirm('Are you sure you want to delete this card?')) {
		var coll = this.model.collection;
		coll.remove(this.model);
	    this.model.destroy();
	  }
	  return false;
	}
  
});