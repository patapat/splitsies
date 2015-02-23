TabSplitter.Views.UserFriends = Backbone.View.extend({
  template: JST['users/friends'],

  initialize: function (options) {
    // this.owers = options.owers;
    this.listenTo(this.model.friends(), "add remove reset sync", this.render);
  },

  render: function () {
    var currentOwers = [];
    $('.tab-ower').each(function (ower) {
      currentOwers.push($(this).data('id'))
    });
    var content = this.template({
      friends: this.model.friends(),
      owers: currentOwers
    });
    this.$el.html(content);

    return this;
  }
});
