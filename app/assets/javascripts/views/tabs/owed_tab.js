TabSplitter.Views.OwedTab = Backbone.CompositeView.extend({
  template: JST['tabs/owed'],

  render: function () {
    var content = this.template({ owedTabs: this.collection });
    this.$el.html(content);

    return this;
  }
});
