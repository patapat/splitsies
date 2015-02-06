TabSplitter.Views.TabFormCustom = Backbone.CompositeView.extend({
  template: JST['tabs/form_custom'],

  events: {
    "change #tab_total_amount": "updateAmount",
    "change #tab-ower": "updateOwers",
    "change .each-amount": "updateAmount"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
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
    var email = $('#tab-ower').val();
    var $liName = $("<li>" + $('#tab-ower').val()+ "</li><input type='text' class='each-amount'>");
    $('#custom-ower').append($liName);
    $('#tab-ower').val("");
  }
});
