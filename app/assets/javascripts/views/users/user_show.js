TabSplitter.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.friends = this.model.friends();
    this.tabs = this.model.tabs();
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    debugger;
    this.addSearchResults();
    this.renderFriends();

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
  },

  renderFriends: function () {
    var that = this;
    TabSplitter.Collections.usersFriends.fetch({
      success: function () {
        var friendView = new TabSplitter.Views.UserFriends({
          model: that.model,
          collection: TabSplitter.Collections.usersFriends
        });
        $("#friends").html(friendView.render().$el);
      }
    });
  }

});
