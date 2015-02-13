TabSplitter.Views.TabShow = Backbone.CompositeView.extend({
  template: JST['tabs/show'],

  events: {
    'click .glyphicon-trash': "deleteTab",
    'click .glyphicon-pencil': "editTab"
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
    var response = confirm("Are you sure you want to delete" + this.model.escape('title') + "?");
    if (response === true) {
      this.collection.remove(this.model);
      this.model.destroy();
      Backbone.history.navigate("", { trigger: true });
    } else {
      return;
    }
  },

  editTab: function () {
    Backbone.history.navigate("#/tabs/" + this.model.id + "/edit", { trigger: true });
  }
});
