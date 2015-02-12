TabSplitter.Views.TabFormCustom = Backbone.CompositeView.extend({
  template: JST['tabs/form_custom'],

  events: {
    "submit form": function (e) {
      this.createOrUpdateTab(e);
      this.renderLoadingButton(e);
    },
    "change #tab_total_amount": "updateAmount",
    'click .glyphicon-plus': "putFriendInTab",
    'click .glyphicon-remove-circle': "removeFriendFromTab",
    'keypress #tab-ower-field': function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        // this.updateAmount(e);
        this.enterPressInput(e);
        this.updateOwers(e);
      }
    },
    "change .amount-each-field": "updateAmount"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.currentDate = this.getCurrentDate();
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

  render: function () {
    var content = this.template({
      tab: this.model,
      currentDate: this.currentDate
    });
    this.$el.html(content);
    this.renderFriends();
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
    var id = $target.data('id');
    $('#custom-ower').append($target.css("font-size", "24px").toggleClass('list-group-item').addClass('tab-ower').removeClass('friend-item checked'));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
    this.renderAmountField(id);
  },

  renderLoadingButton: function (event) {
    var $button = $('.btn-primary');
    var $animate = $('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>')
    $button.text(" Creating...").prepend($animate);
  },

  removeFriendFromTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $target = $('[data-id=' + $iconTarget.data('icon-id') + ']');
    var id = $target.data('id');
    $('#tab-friends').append($target.css("font-size", "").toggleClass('list-group-item').removeClass('tab-ower').addClass('friend-item'));
    $iconTarget.addClass("glyphicon-plus").removeClass('glyphicon-remove-circle');
    $('[data-each-id="' + id + '"]').remove();
  },

  renderAmountField: function (id) {
    $('.amount-each').append($('<input type="text" class="form-control amount-each-field" data-each-id="'+ id + '">'));
  },

  updateAmount: function (event) {
    var allPaidAmounts = $('.amount-each-field');
    var totalPaid = 0;
    allPaidAmounts.each(function() {
      if ($(this).val() !== "") {
        totalPaid += parseFloat($(this).val()).toFixed(2) * 1;
      }
    });
    var initialTotal = $('#tab_total_amount').val();
    var amountLeft = initialTotal - totalPaid;
    $('#custom-total').html("$" + amountLeft.toFixed(2));
  },

  updateOwers: function (event) {
    var $target = $('#tab-friends').find('li:visible:first');
    var $iconTarget = $('[data-icon-id=' + $target.data('id') + ']');
    var id = $target.data('id');
    $('#custom-ower').append($target.css("font-size", "24px").toggleClass('list-group-item').addClass('tab-ower'));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
    $('#tab-ower-field').val("");
    this.renderAmountField(id);
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
