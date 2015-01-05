TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function(options){
    this.collection = this.model.lists();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "sync add", this.render);
    var ListNewView = new TrelloClone.Views.ListsNew({ model: this.model });
    this.addSubview(".newList", ListNewView);
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
    
    this.$el.find(".lists").sortable();
    this.attachSubviews();
    return this;
  }
  
});


// , handle: '.panel-heading'