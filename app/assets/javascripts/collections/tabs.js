TabSplitter.Collections.Tabs = Backbone.Collection.extend({
  url: "api/tabs",

  model: TabSplitter.Models.Tab,

  getOrFetch: function (id) {
    var tab = this.get(id)
    var that = this;

    if (!tab) {
      tab = new TabSplitter.Models({ id: id });
      tab.fetch({
        success: function () {
          that.add(tab);
        }
      });
    } else {
      tab.fetch();
    }

    return tab;
  }
});

TabSplitter.Collections.tabs = new TabSplitter.Collections.Tabs();
