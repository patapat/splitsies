TabSplitter.Views.Account = Backbone.View.extend({
  template: JST['users/account'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      user: this.model,
      amountToPay: this.balanceToPay(),
      amountOwed: this.balanceOwed()
    });
    this.$el.html(content);
    this.addSearchResults();

    return this;
  },

  addSearchResults: function () {
    var that = this;
    TabSplitter.Collections.users.fetch({
      success: function () {
        var searchView = new TabSplitter.Views.UserSearch({
          collection: TabSplitter.Collections.users
        });

        $('.search').html(searchView.render().$el);
      }
    });
  },

  balanceOwed: function () {
    var totalOwed = 0;
    debugger;
    this.model.tabs().each(function (tab) {
      tab.userTabs().each(function (userTab) {
        if (userTab.get('paid')) {
          return;
        } else {
          totalOwed += userTab.get('amount_owed');
        }
      });
    });

    console.log(totalOwed);
    return totalOwed;
  },

  balanceToPay: function () {
    var totalToPay = 0;
    debugger;
    this.model.userTabs().each(function (userTab) {
      if (userTab.get('paid')) {
        return;
      } else {
        totalToPay += userTab.get('amount_owed') * 1;
      }
    });

    console.log(totalToPay);
    return totalToPay;
  },

});
