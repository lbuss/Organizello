TrelloClone.Views.CardsNew = Backbone.CompositeView.extend({
  template: JST["cards/new"],
	
	initialize: function(options){
		
	},
  
  events:{
    "submit form": "submitCard"
  },
  
  render: function() {
    var renderedView = this.template();
    this.$el.html(renderedView);
    return this;
  },
  
  submitCard: function(event) {
    event.preventDefault();
    var view = this;
    var params = $(event.currentTarget).serializeJSON();
    var newCard = new TrelloClone.Models.Card(params["card"]);
    newCard.save({}, {
      success: function() {
        view.model.cards().add(newCard);
        view.render();
      }
    });
  }
  
  
});