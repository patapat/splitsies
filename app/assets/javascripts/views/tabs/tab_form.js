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
    "submit form": "createOrUpdateTab",
    "keyup .new-form": function(e) {
      var code = e.keyCode || e.which;
      if (code  == 13) {
        e.preventDefault();
        return false;
      }
    },
    "keypress .new-form": function(e) {
      var code = e.keyCode || e.which;
      if (code  == 13) {
        e.preventDefault();
        return false;
      }
    },
    'keyup #tab-ower-field': "updateResults"
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  },

  createOrUpdateTab: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();

    this.model.set(formData.tab);

    this.model.save({}, {
      success: function () {
        if (!that.collection.contains(that.model)) {
          that.collection.add(that.model);
        }
        $('.on-tab').each(function (index) {
          var newTab = new TabSplitter.Models.UsersTab();
          newTab.set({

          });
        });


        Backbone.history.navigate("#/tabs/" + that.model.id, { trigger: true });
      }
    });
  },

  updateResults: function () {
    var currentSearch = $('#tab-ower-field').val();
    var $currentResults = $('.friend-item');

    $currentResults.each(function (index) {
      if ($(this).text().indexOf(currentSearch) === -1) {
        $(this).removeClass("checked").hide();
      } else {
        $(this).removeClass("checked").show();
      }
    });

    $('#tab-friends').find('li:visible:first').addClass("checked");
  },

  updateAmount: function (event) {
    var numOwers = $(".even-ower li").length;
    var totalAmount = parseFloat($("#tab_total_amount").val()).toFixed(2);
    var amountEach = totalAmount / numOwers;
    if (numOwers === 0) {
      amountEach = totalAmount;
    }
    if (isNaN(amountEach)) {
      amountEach = 0;
    }

    $('.amount-owed').html("$" + amountEach);
  },

  selectFriend: function (event) {
    var $target = $(event.currentTarget);

    if ($target.attr('class').indexOf("checked") > -1) {
      $target.removeClass("checked");
    } else {
      $target.addClass("checked");
    }
  }
});
