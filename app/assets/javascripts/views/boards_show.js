TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function(options){
    this.list_collection = this.model.lists();
	this.member_collection = this.model.members();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.list_collection, "sync", this.render);
	this.listenTo(this.member_collection, "sync", this.render);
  },
  
  events: {
      'update-lists': 'updateLists'
  },
  
  render: function() {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    var that = this;
    
    this.list_collection.forEach(function(list){
      var view = new TrelloClone.Views.ListsShow({ model: list });
      $('.lists').append(view.render().$el)
    })
	
	if(window.currentUser.id === this.model.get('user_id') || this.model.has_member(window.currentUser)){
    	if($('.newList').is(':empty')){
			var ListNewView = new TrelloClone.Views.ListsNew({ model: this.model });
	    	this.addSubview(".newList", ListNewView);
    	}
	    this.$el.find(".lists").sortable({
			stop: function(event, ui) {
	            ui.item.trigger('dropList', ui.item.index());
			}
	    });
	}
	
    this.attachSubviews();
    return this;
  },
  
  updateLists: function(event, model, position) {
	  	console.log('update-lists event on collection');
          this.list_collection.remove(model);

          this.list_collection.each(function (model, index) {
              var ordinal = index;
              if (index >= position) {
                  ordinal += 1;
              }
				if(model.get('ordinal')!= ordinal){
					console.log("changing "+model.get("ordinal")+ " to "+ordinal+" for "+model.get("title"));
	                model.save({'ordinal': ordinal});
				}
          });            

          model.save({'ordinal': position});
          this.list_collection.add(model, {at: position});
    }
});
