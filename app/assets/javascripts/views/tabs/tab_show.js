TabSplitter.Views.TabShow = Backbone.View.extend({
  template: JST['tabs/show'],

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  }
});
