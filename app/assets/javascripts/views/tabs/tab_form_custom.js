TabSplitter.Views.TabFormCustom = Backbone.CompositeView.extend({
  template: JST['tabs/form_custom'],

  events: {
    "change #tab_total_amount": "updateAmount",
    'click .glyphicon-plus': "putFriendInTab",
    'click .glyphicon-remove-circle': "removeFriendFromTab",
    'keypress #tab-ower-field': function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        this.updateAmount(e);
        this.enterPressInput(e);
        this.updateOwers(e)
      }
    },
    "change .each-amount": "updateAmount"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);
    this.renderFriends();

    return this;
  },

  renderFriends: function () {
    var currentUser = TabSplitter.Collections.users.getOrFetch(CURRENT_USER.id);
    var friendView = new TabSplitter.Views.UserFriends({
      model: currentUser,
      collection: TabSplitter.Collections.usersFriends
    });

    this.addSubview("#tab-friends", friendView);
  },

  enterPressInput: function (event) {
    console.log("ENTER");
  },

  putFriendInTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $target = $('[data-id=' + $iconTarget.data('icon-id') + ']');
    $('#custom-ower').append($target.addClass('tab-ower'));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
  },

  removeFriendFromTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $target = $('[data-id=' + $iconTarget.data('icon-id') + ']');
    $('#tab-friends').append($target.removeClass('tab-ower'));
    $iconTarget.addClass("glyphicon-plus").removeClass('glyphicon-remove-circle');
  },

  updateAmount: function (event) {
    var allPaidAmounts = $('.each-amount');
    var totalPaid = 0;

    allPaidAmounts.each(function() {
      if ($(this).val() !== "") {
        totalPaid += parseFloat($(this).val()).toFixed(2);
      }
    });

    var initialTotal = $('#tab_total_amount').val();
    var amountLeft = initialTotal - totalPaid;
    $('#custom-total').html("$" + amountLeft.toFixed(2));
  },

  updateOwers: function (event) {
    var $target = $('#tab-friends').find('li:visible:first');
    var $iconTarget = $('[data-icon-id=' + $target.data('id') + ']');
    $('#custom-ower').append($target.addClass('tab-ower'));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
    $('#tab-ower-field').val("");
  }
});
