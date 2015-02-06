TabSplitter.Views.TabShow = Backbone.CompositeView.extend({
  template: JST['tabs/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  }
});
