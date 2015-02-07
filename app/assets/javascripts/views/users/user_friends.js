TabSplitter.Views.UserFriends = Backbone.View.extend({
  template: JST['users/friends'],

  initialize: function () {
    this.listenTo(this.model.friends(), "add remove sync", this.render);
  },

  render: function () {
    var content = this.template({ friends: this.model.friends() });
    this.$el.html(content);

    return this;
  }
});
