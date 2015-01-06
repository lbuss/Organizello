TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: "/api/cards",
  
  parse: function(payload) {
      if(payload.items) {
        this.items().set(payload.items, {parse: true});
        delete payload.items;
      }
      return payload;
    
    return payload;
  },
  
  items: function() {
    if (!this._items) {
      this._items = new TrelloClone.Collections.Items([], {
        card: this
      });
    }
    return this._items;
  }
});