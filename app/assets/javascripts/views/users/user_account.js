TabSplitter.Views.Account = Backbone.View.extend({
  template: JST['users/account'],

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
});
