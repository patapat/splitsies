TabSplitter.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  friends: function () {
    if (!this._friends) {
      this._friends = new TabSplitter.Collections.UsersFriends([], { user: this });
    }
    return this._friends;
  },

  tabs: function () {
    if (!this._tabs) {
      this._tabs = new TabSplitter.Collections.UsersTabs([], { user: this });
    }

    return this._tabs;
  },

  owedTabs: function () {
    if (!this._tabs) {
      this._tabs = new TabSplitter.Collections.UsersTabs([], { user: this });
    }

    return this._tabs;
  },

  parse: function (response) {
    if (response.friends) {
      this.friends().set(response.friends, { parse: true });
      delete response.friends;
    } else if (response.tabs) {
      this.tabs().set(response.tabs, { parse: true });
      delete response.tabs;
    } else if (response.owedTabs) {
      this.owedTabs().set(response.owedTabs, { parse: true });
      delete response.owedTabs;
    }

    return response;
  }
});
