TabSplitter.Views.Account = Backbone.View.extend({
  template: JST['users/account'],

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.addSearchResults();

    return this;
  },

  addSearchResults: function () {
    var that = this;
    TabSplitter.Collections.users.fetch({
      success: function () {
        var searchView = new TabSplitter.Views.UserSearch({
          collection: TabSplitter.Collections.users
        });

        $('.search').html(searchView.render().$el);
      }
    });
  }

});
