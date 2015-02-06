TabSplitter.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  
  model: TabSplitter.Models.User,

  getOrFetch: function (id) {
    var user = this.get(id)
    var that = this;

    if (!user) {
      user = new TabSplitter.Models.User({ id: id });
      user.fetch({
        success: function () {
          that.add(user);
        }
      });
    } else {
      user.fetch();
    }

    return user;
  }
});

TabSplitter.Collections.users = new TabSplitter.Collections.Users();
