TrelloClone.Views.ItemsShow = Backbone.CompositeView.extend({
	template: JST["items/show"],
	
	// tagName: "li",
	
	className: "item",
	
	events: {
		'change :checkbox': "updateDone"
	},
  
	render: function(){
		var renderedView = this.template({
			item: this.model
		});
		this.$el.html(renderedView);
		
		
		// this.$el.find(".itemBox").onchange = function(){alert("change!")}
		
		return this;
	},
	
	updateDone: function(){
		if(this.model.get("done")){
			this.model.save({"done": false});
		}else{
			this.model.save({"done": true});
		}
	}
  
});