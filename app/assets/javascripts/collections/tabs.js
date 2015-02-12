TabSplitter.Collections.Tabs = Backbone.Collection.extend({
  url: "api/tabs",
  //
  // comparator: function (tab1, tab2) {
  //   if (tab1.get('title') < tab2.get('title')) {
  //     return -1 * this._sortOrder;
  //   } else if (tab1.get('title') > tab2.get('title')) {
  //     return 1  * this._sortOrder;
  //   } else {
  //     return 0  * this._sortOrder;
  //   }
  // },
  comparator: "date",
  
  model: TabSplitter.Models.Tab,

  getOrFetch: function (id) {
    var tab = this.get(id)
    var that = this;

    if (!tab) {
      tab = new TabSplitter.Models.Tab({ id: id });

      tab.fetch({
        success: function () {
          that.add(tab);
        }
      });
    } else {
      tab.fetch();
    }

    return tab;
  },

  setComparatorVariables: function (attribute) {
    if (attribute == this._comparator) {
      this._sortOrder = this._sortOrder * -1;
    } else {
      this._sortOrder = 1;
      this._comparator = attribute;
    }
  }
});

TabSplitter.Collections.tabs = new TabSplitter.Collections.Tabs();
