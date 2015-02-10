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
    "tabs/:id/edit-even": "editEven",
    "tabs/:id/edit-custom": "editCustom",
    "users/new": "userNew",
    "users/:id": "userShow",
    "account": "account"
  },

  checkBalance: function () {
    var $balance = $("#account-balance");

    if ($balance.val() >= 0) {
      $balance.addClass("positive");
    } else {
      $balance.addClass("negative");
    }
  },

  homepage: function () {
    var homepageView = new TabSplitter.Views.Homepage();

  },

  account: function () {
    var that = this;
    var currentUser = TabSplitter.Collections.users.getOrFetch(CURRENT_USER.id);
    var accountView = new TabSplitter.Views.Account({ model: currentUser })
    TabSplitter.Collections.tabs.fetch({
      success: function () {
        var indexView = new TabSplitter.Views.TabsIndex({
          collection: TabSplitter.Collections.tabs
        });

        that._swapView(accountView);
        that.checkBalance();
        $('#latest-activity').append(indexView.render().$el);
      }
    });

    // var sidebarView = new TabSplitter.Views.Sidebar({ $selector: $('#account')});
    // $('#sidebar-nav').append(sidebarView.render().$el);

    $('#account').addClass("active");
  },


  userNew: function () {

    var user = new TabSplitter.Models.User();
    var newUserView = new TabSplitter.Views.UserForm({
      model: user,
      collection: TabSplitter.Collections.users
      });


    this._swapView(newUserView);
  },

  userShow: function (id) {
    var user = TabSplitter.Collections.users.getOrFetch(id);
    var userView = new TabSplitter.Views.UserShow({ model: user });

    $('#cj').addClass("active");
    this._swapView(userView);
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
    var that = this;

    TabSplitter.Collections.tabs.fetch({
      success: function () {
        var showView = new TabSplitter.Views.TabShow({
          model: tab,
          collection: TabSplitter.Collections.tabs
        });
        that._swapView(showView);
      }
    });
  },

  new: function () {
    var tab = new TabSplitter.Models.Tab();

    var newView = new TabSplitter.Views.TabForm({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    $('#tabs').addClass("active");
    this._swapView(newView);
    this.newEven();
  },

  newEven: function () {
    var tab = new TabSplitter.Models.Tab();

    var newEvenView = new TabSplitter.Views.TabFormEven({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(newEvenView);
  },

  newCustom: function () {
    this.new();
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
    this.editEven(id);
  },

  editEven: function (id) {
    var tab = TabSplitter.Collections.tabs.getOrFetch(id);

    var editEvenView = new TabSplitter.Views.TabFormEven({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(editEvenView);
  },

  editCustom: function (id) {
    this.edit(id);
    var tab = TabSplitter.Collections.tabs.getOrFetch(id);

    var editCustomView = new TabSplitter.Views.TabFormCustom({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(editCustomView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

  _swapFormView: function (view) {
    $("#tab-type-main").html(view.render().$el);
  }
})
