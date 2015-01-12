TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",
  
  parse: function(payload) {
    if(payload.lists) {
      this.lists().set(payload.lists, {parse: true});
      delete payload.lists;
    }
    if(payload.members) {
      this.members().set(payload.members, {parse: true});
      delete payload.members;
    }
    return payload;
  },
  
  lists: function() {
    if (!this._lists) {
      this._lists = new TrelloClone.Collections.Lists([], {
        board: this
      });
    }
    return this._lists;
  },
  
  members: function() {
    if (!this._members) {
      this._members = new TrelloClone.Collections.Members([], {
        board: this
      });
    }
    return this._members;
  },
  
  has_member: function(user){
	 var hasmember = false;
	 for (i=0; i<this.members().length; i++){
		 if(this.members().models[i].id === user.id){
			 hasmember = true;
			 break;
		 }
	 }
	 return hasmember;
  }
});