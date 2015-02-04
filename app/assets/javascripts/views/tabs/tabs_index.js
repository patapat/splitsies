TabSplitter.Views.TabsIndex = Backbone.CompositeView.extend({
  template: JST['tabs/index'],

  render: function () {
    var content = this.template({ tabs: this.collection })
    this.$el.html(content);

    return this;
  }
})
