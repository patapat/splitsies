TabSplitter.Collections.UsersTabs = Backbone.Collection.extend({
  url: "api/users_tabs",

  model: TabSplitter.Models.UsersTab,

  initialize: function (models, options) {
    this.user = options.user
  },

  getOrFetch: function (id) {
    var usersTab = this.get(id)
    var that = this;

    if (!usersTab) {
      usersTab = new TabSplitter.Models.UsersTab({ id: id });
      usersTab.fetch({
        success: function () {
          that.add(usersTab);
        }
      });
    } else {
      usersTab.fetch();
    }

    return usersTab;
  }
});

TabSplitter.Collections.usersTabs = new TabSplitter.Collections.UsersTabs([], {});
