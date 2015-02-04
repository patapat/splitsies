TabSplitter.Views.TabFormEven = Backbone.CompositeView.extend({
  template: JST['tabs/form_even'],

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

    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();

    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
});
