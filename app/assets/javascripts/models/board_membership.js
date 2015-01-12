TrelloClone.Models.BoardMembership = Backbone.Model.extend({
  urlRoot: "/api/board_memberships",
  
  parse: function(payload) {
	  return payload;
  }
});