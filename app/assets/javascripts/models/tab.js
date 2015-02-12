TabSplitter.Models.Tab = Backbone.Model.extend({
  urlRoot: "api/tabs",

  userTabs: function () {
    if (!this._userTabs) {
      this._userTabs = new TabSplitter.Collections.UsersTabs([], { user: this });
    }

    return this._userTabs;
  },

  parse: function (response) {
    if (response.users_tabs) {
      this.userTabs().set(response.users_tabs, { parse: true });
      delete response.userTabs;
    }

    return response;
  }

});
