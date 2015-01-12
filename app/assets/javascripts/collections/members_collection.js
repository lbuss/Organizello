TrelloClone.Collections.Members = Backbone.Collection.extend({
  model: TrelloClone.Models.BoardMembership,

  initialize: function(models, options) {
    this.board = options.board;
  }
});