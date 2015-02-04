TabSplitter.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "tabs/:id": "show",
    "tabs/new": "new",
    "tabs/:id/edit": "edit",
  },

  index: function () {
    TabSplitter.Collections.tabs.fetch();

    var indexView = new TabSplitter.Views.TabsIndex({
      collection: TabSplitter.Collections.tabs
    });

    this._swapView(indexView);
  },

  show: function (id) {
    var tab = TabSplitter.Collections.tabs.getOrFetch(id);

    var showView = new TabSplitter.Views.TabShow({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapView(showView);
  },

  new: function () {
    var tab = new TabSplitter.Models.Tab();

    var newView = new TabSplitter.Views.TabForm({
      model: tab
    });

    this._swapView(newView);
  },

  edit: function (id) {
    var tab = TabSplitter.Collections.tabs.getOrFetch(id);

    var editView = new TabSplitter.Views.TabForm({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapView(editView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
