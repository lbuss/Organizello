TrelloClone.Views.ItemsNew = Backbone.CompositeView.extend({
  template: JST["items/new"],

  initialize: function(options){
		
  },
  
  events:{
    "submit form": "submitItem"
  },
  
  render: function() {
    var renderedView = this.template();
    this.$el.html(renderedView);
    return this;
  },
  
  submitItem: function(event) {
    event.preventDefault();
    var view = this;
    var params = $(event.currentTarget).serializeJSON();
	params.item.card_id = this.model.id;
    var newItem = new TrelloClone.Models.Item(params["item"]);
    newItem.save({}, {
      success: function() {
        view.model.items().add(newItem);
        view.render();
      }
    });
  }
  
  
});