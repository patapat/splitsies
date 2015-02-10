TabSplitter.Views.TabFormEven = Backbone.CompositeView.extend({
  template: JST['tabs/form_even'],

  events: {
    "submit form": "createOrUpdateTab",
    "change #tab_total_amount": "updateAmount",
    'click .glyphicon-plus': "putFriendInTab",
    'click .glyphicon-remove-circle': "removeFriendFromTab",
    'click .glyphicon': "updateAmount",
    'keypress #tab-ower-field': function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        this.updateOwers(e);
        this.updateAmount(e);
      }
    }
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

  putFriendInTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $target = $('[data-id=' + $iconTarget.data('icon-id') + ']');
    $('.even-ower').append($target.addClass('tab-ower').removeClass("friend-item"));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
  },

  removeFriendFromTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $target = $('[data-id=' + $iconTarget.data('icon-id') + ']');
    $('#tab-friends').append($target.removeClass('tab-ower').addClass("friend-item"));
    $iconTarget.addClass("glyphicon-plus").removeClass('glyphicon-remove-circle');
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

    $('.amount-owed').html("$" + amountEach.toFixed(2));
  },

  updateOwers: function (event) {
    var $target = $('#tab-friends').find('li:visible:first');
    var $iconTarget = $('[data-icon-id=' + $target.data('id') + ']');
    $('.even-ower').append($target.addClass('tab-ower'));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
    $('#tab-ower-field').val("");
  },

  createOrUpdateTab: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();

    this.model.set(formData.tab);

    this.model.save({}, {
      success: function () {
        var needNewTab = false;
        if (!that.collection.contains(that.model)) {
          that.collection.add(that.model);
          needNewTab = true;
        }
        $('.tab-ower').each(function (index) {
          var id = $(this).data('id');
          if (CURRENT_USER.id === id) {
            return;
          }
          debugger;
          if (needNewTab) {
            var newTab = new TabSplitter.Models.UsersTab();
          } else {
            var newTab = TabSplitter.Collections.usersTabs.getOrFetch(that.model.id);
          }
          var user = TabSplitter.Collections.users.getOrFetch(id);
          var amountEach = parseFloat($('.amount-owed').text().replace(/\$/g, ''));

          newTab.set({
            "user_id": user.id,
            "tab_id": that.model.id,
            "amount_owed": amountEach
          });

          newTab.save({}, {
            success: function () {
              debugger;
              if (!TabSplitter.Collections.usersTabs.contains(newTab)) {
                TabSplitter.Collections.usersTabs.add(newTab);
              }
            }
          });
        });

        Backbone.history.navigate("#/tabs/" + that.model.id, { trigger: true });
      }
    });
  }
});
