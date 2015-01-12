TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    var boardNewView = new TrelloClone.Views.BoardsNew();
    this.addSubview(".board-new", boardNewView);
  },
  
  render: function() {
    var renderedContent = this.template({ boards: this.collection });
	
	this.$el.html(renderedContent);
	
	this.collection.forEach( function(board) {
		if(board.get("user_id") === window.currentUser.id) { 
		    $("#ownBoards").append("<li><a href='#/boards/" + board.get('id') + "'>" + board.escape("title") + "</a></li>");
		 }
		
		if(board.get("user_id") != window.currentUser.id && board.has_member(window.currentUser)) { 
			$("#memberBoards").append("<li><a href='#/boards/" + board.get('id') + "'>" + board.escape("title") + "</a> by " + board.escape("email") + "</li>");
		}

		if(board.get("user_id") != window.currentUser.id && !board.has_member(window.currentUser)) { 
			$("#otherBoards").append("<li><a href='#/boards/" + board.get('id') + "'>" + board.escape("title") + "</a> by " + board.escape("email") + "</li>");
		}
	});
	
    
    this.attachSubviews();
    return this;
  }
  
  
});