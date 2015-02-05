TabSplitter.Views.TabFormCustom = Backbone.CompositeView.extend({
  template: JST['tabs/form_custom'],

  events: {
    "submit form": "createTab",
    "change #tab_total_amount": "updateAmount",
    "change #tab-ower": "updateOwers",
    "change .each-amount": "updateAmount"
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  },

  createTab: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();

    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  updateAmount: function (event) {
    var allPaidAmounts = $('.each-amount');
    var totalPaid = 0;

    allPaidAmounts.each(function() {
      if ($(this).val() !== "") {
        totalPaid += parseInt($(this).val());
      }
    });

    var initialTotal = $('#tab_total_amount').val();
    var amountLeft = initialTotal - totalPaid;
    $('#custom-total').html("$" + amountLeft);
  },

  updateOwers: function (event) {
    var email = $('#tab-ower').val();
    var $liName = $("<li>" + $('#tab-ower').val()+ "</li><input type='text' class='each-amount'>");
    $('#custom-ower').append($liName);
    $('#tab-ower').val("");
  }
});
