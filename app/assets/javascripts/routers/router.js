TabSplitter.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "tabs/new": "new",
    "tabs/new-even": "newEven",
    "tabs/new-custom": "newCustom",
    "tabs/:id": "show",
    "tabs/:id/edit": "edit",
  },

  index: function () {
    var that = this;
    TabSplitter.Collections.tabs.fetch({
      success: function () {
        var indexView = new TabSplitter.Views.TabsIndex({
          collection: TabSplitter.Collections.tabs
        });
        that._swapView(indexView);
      }
    });
  },

  show: function (id) {
    var tab = TabSplitter.Collections.tabs.getOrFetch(id);

    var showView = new TabSplitter.Views.TabShow({
      model: tab
    });

    this._swapView(showView);
  },

  new: function () {
    var tab = new TabSplitter.Models.Tab();

    var newView = new TabSplitter.Views.TabForm({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapView(newView);
  },

  newEven: function () {
    this.new()
    var tab = new TabSplitter.Models.Tab();

    var newEvenView = new TabSplitter.Views.TabFormEven({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(newEvenView);
  },

  newCustom: function () {
    this.new()
    var tab = new TabSplitter.Models.Tab();

    var newCustomView = new TabSplitter.Views.TabFormCustom({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(newCustomView);
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
  },

  _swapFormView: function (view) {
    // this._currentView && this._currentView.remove();
    // this._currentView = view;

    $("#tab-type-main").html(view.render().$el);
  }
})
