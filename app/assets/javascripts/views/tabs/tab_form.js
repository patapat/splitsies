TabSplitter.Views.TabForm = Backbone.CompositeView.extend({
  initialize: function () {
   $('input').keyup(function(e){
     if(e.keyCode == 13){
        $(this).trigger('enter');
     }

   });
  },

  className: "tab-form-main",

  template: JST['tabs/form'],

  events: {
    "submit .new-form": "createTab",
    "submit .edit-form": "updateTab",
    "change #tab_total_amount": "updateAmount",
    "change #tab-ower": function (e) {
      this.updateOwers(e);
      this.updateAmount(e);
    }
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

    this.model.set(formData.tab);
    debugger;

    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
        Backbone.history.navigate("#/tabs/" + that.model.id, { trigger: true });
      }
    });
  },

  updateTab: function (event) {
    event.preventDefault()

    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();

    this.model.set(formData.tab);
    debugger;
    
    this.model.save({}, {
      success: function () {
        debugger;
        Backbone.history.navigate("#/tabs/" + that.model.id, { trigger: true });
      }
    });
  },

  updateAmount: function (event) {
    var numOwers = $(".even-ower li").length;
    var totalAmount = $('#tab_total_amount').val();
    var amountEach = totalAmount / numOwers;
    if (numOwers === 0) {
      amountEach = totalAmount;
    }

    $('.amount-owed').html("$" + amountEach);
  },

  updateOwers: function (event) {
    var $liName = $("<li>" + $('#tab-ower').val()+ "</li>");
    $('.even-ower').append($liName);
    $('#tab-ower').val("");
  }

});
