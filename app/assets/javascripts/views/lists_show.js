TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	tagName: "li",
	
	className: "list",
	
	events: {
		'dropList' : 'drop',
		'update-cards': 'updateCards'
	},
	    
  
	initialize: function() {
		this.collection = this.model.cards();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.cards(), "sync", this.render);
	},
  
	drop: function(event, index) {
		console.log('drop event on ' + this.model.get("title"));
		this.$el.trigger('update-lists', [this.model, index]);
	},
  
	render: function() {
		var renderedView = this.template({
			list: this.model
		});

		this.$el.html(renderedView);
   
		this.$el.find(".cards").sortable({
			connectWith: '.cards',
			
			stop: function(event, ui) {
				ui.item.trigger('dropCard', ui.item.index());
			}
		});
   
		var that = this;
		this.collection.forEach( function(card) {
			var cardView = new TrelloClone.Views.CardsShow({
				model: card
			})
			that.$el.find(".cards").append(cardView.render().$el);
		})
   
		var cardNewView = new TrelloClone.Views.CardsNew({model: this.model});
		that.$el.find(".newCard").append(cardNewView.render().$el);
   
		this.attachSubviews();
		return this;
	},
	
	updateCards: function(event, model, position) {
		console.log('update-add event on collection');
		
		if(this.collection != model.collection){
			model.collection.each(function (model, index) {
				var ordinal = index;
				if (index >= position) {
					ordinal -= 1;
				}
				if(model.get('ordinal')!= ordinal){
					console.log("changing "+model.get("ordinal")+ " to "+ordinal+" for "+model.get("title"));
					model.save({'ordinal': ordinal});
				}
			});  
		
			model.collection.remove(model);
		} else {
			this.collection.remove(model);
		}
		
		

		this.collection.each(function (model, index) {
			var ordinal = index;
			if (index >= position) {
				ordinal += 1;
			}
			if(model.get('ordinal')!= ordinal){
				console.log("changing "+model.get("ordinal")+ " to "+ordinal+" for "+model.get("title"));
				model.save({'ordinal': ordinal});
			}
		});            

		list = this.model;
		
		this.collection.add(model, {at: position});
		model.save({'ordinal': position, 'list_id': list.id});
	}
	 
})