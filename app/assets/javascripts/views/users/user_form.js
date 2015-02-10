TabSplitter.Views.UserForm = Backbone.View.extend({
  template: JST['users/form'],

  events: {
    "submit form": "createUser"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  createUser: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();

    this.model.set(formData.user);
    debugger;
    this.model.save({}, {
      success: function () {

        if (!that.collection.contains(that.model)) {
          that.collection.add(that.model);
        }
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
})
