TabSplitter.Views.NavBar = Backbone.CompositeView.extend({
  template: JST['navs/navbar'],

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
});
