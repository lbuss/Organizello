TrelloClone.Collections.Cards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,

  comparator: function(model) {
	  return model.get('ordinal');
  },

  initialize: function(models, options) {
    this.list = options.list;
  }
});