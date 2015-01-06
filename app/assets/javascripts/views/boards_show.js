TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function(options){
    this.collection = this.model.lists();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync", this.render);
    var ListNewView = new TrelloClone.Views.ListsNew({ model: this.model });
    this.addSubview(".newList", ListNewView);
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
    
    this.collection.forEach(function(list){
      var view = new TrelloClone.Views.ListsShow({ model: list });
      $('.lists').append(view.render().$el)
    })
    
    this.$el.find(".lists").sortable({
		stop: function(event, ui) {
            ui.item.trigger('dropList', ui.item.index());
		}
    });
	
    this.attachSubviews();
    return this;
  },
  
  updateLists: function(event, model, position) {
	  	console.log('update-lists event on collection');
          this.collection.remove(model);

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

          model.save({'ordinal': position});
          this.collection.add(model, {at: position});

          // to update ordinals on server:
          var ids = this.collection.pluck('id');
		  console.log(ids.join(', '));
          // $('#post-data').html('post ids to server: ' + ids.join(', '));

          // this.render();
    }
});


// , handle: '.panel-heading'