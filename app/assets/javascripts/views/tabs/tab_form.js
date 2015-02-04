TabSplitter.Views.TabForm = Backbone.View.extend({
  template: JST['tabs/form'],

  events: {
    "submit form": "createTab"
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  },

  createTab: function (event) {
    event.preventDefault();
  
    var that = this;

    var formData = this.$el.serialiazeJSON();
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        that.collection.add(this.model);
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
});
