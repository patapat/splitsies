TabSplitter.Views.TabShow = Backbone.CompositeView.extend({
  template: JST['tabs/show'],

  events: {
    'click button': "deleteTab"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  },

  deleteTab: function () {
    this.collection.remove(this.model);
    this.model.destroy();
    Backbone.history.navigate("", { trigger: true });
  }
});
