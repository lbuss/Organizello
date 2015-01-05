TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",
  
  parse: function(payload) {
    
    return payload;
  },
  
  cards: function() {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], {
        list: this
      });
    }
    return this._cards;
  }
});