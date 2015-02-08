TabSplitter.Views.UserFriends = Backbone.View.extend({
  template: JST['users/friends'],

  initialize: function () {
    console.log(this.collection);
    console.log(this.model.friends());
    this.listenTo(this.model.friends(), "add remove reset sync", this.render);
  },

  render: function () {
    var content = this.template({ friends: this.model.friends() });
    this.$el.html(content);

    return this;
  }
});
