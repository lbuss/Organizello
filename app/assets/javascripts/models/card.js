TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: "/api/cards",
  
  parse: function(payload) {
    
    return payload;
  }
  
  // lists: function() {
//     if (!this._lists) {
//       this._lists = new TrelloClone.Collections.Lists([], {
//         board: this
//       });
//     }
//     return this._lists;
//   }
});