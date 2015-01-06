TrelloClone.Collections.Items = Backbone.Collection.extend({
  model: TrelloClone.Models.Item,

  initialize: function(models, options) {
    this.card = options.card;
  }
});