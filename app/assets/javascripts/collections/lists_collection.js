TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
	
    comparator: function(model) {
  	  return model.get('ordinal');
    },

  initialize: function(models, options) {
    this.board = options.board;
  }
});