TabSplitter.Collections.UsersFriends = Backbone.Collection.extend({
  url: "api/users_friends",

  model: TabSplitter.Models.UsersFriend,

  initialize: function (models, options) {
    this.user = options.user
  },

  getOrFetch: function (id) {
    var usersFriend = this.get(id)
    var that = this;

    if (!usersFriend) {
      usersFriend = new TabSplitter.Models.UsersFriend({ id: id });
      usersFriend.fetch({
        success: function () {
          that.add(usersFriend);
        }
      });
    } else {
      usersFriend.fetch();
    }

    return usersFriend;
  }
});

TabSplitter.Collections.usersFriends = new TabSplitter.Collections.UsersFriends([], {});
