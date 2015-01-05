TrelloClone.Views.BoardsNew = Backbone.CompositeView.extend({
  template: JST["boards/new"],
  
  events: {
    "submit form": "submit"
  },
  
  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(params["board"]);
    var that = this;
    newBoard.save({}, {
      success: function() {
        TrelloClone.Collections.boards.add(newBoard);
        Backbone.history.navigate("/boards/"+newBoard.get("id"), {trigger:true});
      }
    })
  }
  
})