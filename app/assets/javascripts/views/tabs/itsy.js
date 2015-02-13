TabSplitter.Views.Itsy = Backbone.CompositeView.extend({
  template: JST['tabs/itsy'],

  events: {
    "submit form": "createTab",
    'click .glyphicon-plus': "putFriendInTab",
    'click .glyphicon': "updateAmount",
    'keypress #tab-ower-field': function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        this.updateOwers(e);
        this.updateAmount(e);
      }
    }
  },

  render: function () {
    var content = this.template({
      tab: this.model,
      currentDate: this.getCurrentDate()
    });
    this.$el.html(content);
    this.renderFriends();

    return this;
  },

  createTab: function (event) {
    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();
    this.model.set(formData.tab);

    this.model.save({}, {
      success: function () {
        if (!that.collection.contains(that.model)) {
          that.collection.add(that.model);
        }

        var id = $('.tab-ower').data('id');
        var targetAmount = that.strToNum($('[data-each-id=' + id + ']').text());
        var user = TabSplitter.Collections.users.getOrFetch(id);

        newTab.set({
          "user_id": user.id,
          "tab_id": that.model.id,
          "amount_owed": targetAmount
        });

        newTab.save({}, {
          success: function () {
            if (!TabSplitter.Collections.usersTabs.contains(newTab)) {
              TabSplitter.Collections.usersTabs.add(newTab);
            }
          }
        });

        Backbone.history.navigate("#", { trigger: true });
      }
    });
  },

  putFriendInTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $imgTarget = $('[data-id=' + $iconTarget.data('icon-id') + '] > img');
    var id = $iconTarget.data('id');
    $('.even-ower').append($imgTarget.addClass('tab-ower large-gravatar'));
    $iconTarget.addClass('glyphicon-remove-circle');
    this.renderAmountField(id);
  },

  getCurrentDate: function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    return today;
  },

  strToNum: function (str) {
    var num = str.replace(/\$/g, '') * 1;
    return num;
  },

  renderFriends: function () {
    var currentUser = TabSplitter.Collections.users.getOrFetch(CURRENT_USER.id);
    var friendView = new TabSplitter.Views.UserFriends({
      model: currentUser,
      collection: TabSplitter.Collections.usersFriends
    });

    this.addSubview("#tab-friends", friendView);
  },

  updateOwers: function (event) {
    var $target = $('#tab-friends').find('li:visible:first');
    var id = $target.data('id')
    var $iconTarget = $('[data-icon-id=' + id + ']');
    $('.even-ower').append($target.toggleClass('list-group-item').addClass('tab-ower large-gravatar'));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
    $('#tab-ower-field').val("");
    this.renderAmountField(id);
  },

  renderAmountField: function (id) {
    $('.amount-each').append($('<li class="amount-each-field" data-each-id="'+ id + '"></li>'));
  },

  updateAmount: function (event) {
    var numOwers = $(".even-ower li").length;
    var totalAmount = parseFloat($("#tab_total_amount").val());
    var amountEach = totalAmount / numOwers;

    if (numOwers === 0) {
      amountEach = totalAmount;
    }
    if (isNaN(amountEach)) {
      amountEach = 0;
    }
    $('.amount-each-field').html("$" + amountEach.toFixed(2));
  }
});
