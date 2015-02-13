TabSplitter.Views.OwedTab = Backbone.CompositeView.extend({
  template: JST['tabs/owed'],

  events: {
    "click a": "makePayment"
  },

  render: function () {
    var content = this.template({
      usersTabs: this.model.userTabs()
     });
    this.$el.html(content);

    return this;
  },

  makePayment: function (event) {
    this.renderAlert();
    var that = this;
    var $target = $(event.currentTarget)
    var id = $target.data('id');
    this.model.userTabs().each(function (userTab) {
      if (userTab.get('id') === id) {
        userTab.save({paid: true}, {
          success: function () {
            that.render();
          }
        });
      }
    });
  },

  renderAlert: function () {
    $('#payment-alert').fadeIn(2000).fadeOut(1000);
  }


});
