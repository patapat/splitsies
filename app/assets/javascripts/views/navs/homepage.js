TabSplitter.Views.Homepage = Backbone.CompositeView.extend({
  template: JST['navs/homepage'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
