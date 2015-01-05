TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
	
	tagName: "li",
	
  className: "list",
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
   var renderedView = this.template({
     list: this.model
   });

   this.$el.html(renderedView);
   
   // this.$el.find(".cards").sortable({
//      connectWith: ".cards" });
   
   var that = this;
   var cards = this.model.get('cards');
   _(cards).each( function(card) {
     var cardView = new TrelloClone.Views.CardsShow({
       model: card
     })
     that.$el.find(".cards").append(cardView.render().$el);
   })
   
   var cardNewView = new TrelloClone.Views.CardsNew({model: this.model});
   that.$el.find(".newCard").append(cardNewView.render().$el);
   
   this.attachSubviews();
   return this;
  }
  
  
  
})