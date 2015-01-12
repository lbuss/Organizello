TrelloClone.Routers.TrelloCloneRouter = Backbone.Router.extend({
  routes: {
    "": "boardsIndex",
    "boards/:id": "boardsShow"
  },
  
  boardsIndex: function() {
    TrelloClone.Collections.boards = new TrelloClone.Collections.Boards;
    this.loadBoards();
    var indexView = new TrelloClone.Views.BoardIndex({
      collection: TrelloClone.Collections.boards
    });  

    this._swapView(indexView);
  },
  
  _swapView: function(newView) {
    if (this.currentView){
      this.currentView.remove();
    }
    $("#main").html(newView.render().$el);
    this.currentView = newView;
  },
  
  boardsShow: function(id) {
   var board = TrelloClone.Collections.boards.getOrFetch(id);
   var boardShow = new TrelloClone.Views.BoardsShow({
     model: board
   })
  
  this._swapView(boardShow);  
  },
  
  loadBoards: function() {
    $.ajax({url:'/api/boards',
    dataType: 'json',
    success: function(data){
      TrelloClone.Collections.boards.set(data.boards);
	  TrelloClone.Collections.boards.forEach(function(board){
		  board.members().set(board.get("members"));
	  })
      TrelloClone.Collections.boards.trigger('sync');
    }
  })
  },
  
});