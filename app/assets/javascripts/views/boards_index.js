TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  
  initialize: function() {
    this.listenTo(this.collection, "sync add", this.render);
    var boardNewView = new TrelloClone.Views.BoardsNew();
    this.addSubview(".board-new", boardNewView);
  },
  
  render: function() {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  }
  
  
});