TrelloClone.Views.CardsShow = Backbone.CompositeView.extend({
  template: JST["cards/show"],
  
  render: function(){
    var renderedView = this.template({
      card: this.model
    });
    this.$el.html(renderedView);
    return this;
  }
  
});