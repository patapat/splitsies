TabSplitter.Views.SearchItem = Backbone.View.extend({
  template: JST['users/search_item'],

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    
    return this;
  }
})
