TabSplitter.Views.TabFormEven = Backbone.CompositeView.extend({
  template: JST['tabs/form_even'],

  events: {
    "submit form": function (e) {
      this.createOrUpdateTab(e);
      this.renderLoadingButton(e);
    },
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
    },
    'click #add-friend': "highlightFriendField"
  },

  highlightFriendField: function () {
    $("#tab-friends").fadeOut(100).fadeIn(100)
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

  initialize: function (options) {
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

  renderFriends: function () {

    var currentUser = TabSplitter.Collections.users.getOrFetch(CURRENT_USER.id);
    var friendView = new TabSplitter.Views.UserFriends({
      model: currentUser,
      collection: TabSplitter.Collections.usersFriends
    });

    this.addSubview("#tab-friends", friendView);
  },

  renderLoadingButton: function (event) {
    var $button = $('.btn-primary');
    var $animate = $('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>')
    $button.text(" Creating...").prepend($animate);
  },

  putFriendInTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $target = $('[data-id=' + $iconTarget.data('icon-id') + ']');
    var id = $target.data('id');
    $('.even-ower').append($target.toggleClass('list-group-item').addClass('tab-ower').removeClass("friend-item").removeClass("checked"));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
    this.renderAmountField(id);
  },

  removeFriendFromTab: function (event) {
    var $iconTarget = $(event.currentTarget);
    var $target = $('[data-id=' + $iconTarget.data('icon-id') + ']');
    var id = $target.data('id');
    $('#tab-friends').append($target.css("font-size", "").toggleClass('list-group-item').removeClass('tab-ower').addClass("friend-item"));
    $iconTarget.addClass("glyphicon-plus").removeClass('glyphicon-remove-circle');
    $('[data-each-id="' + id + '"]').remove();
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
    this.ensureAccurateSum();
  },

  strToNum: function (str) {
    var num = str.replace(/\$/g, '') * 1;
    return num;
  },

  ensureAccurateSum: function () {
    var that = this;
    var numOwers = $('.amount-each-field').length
    var actualTotal = parseFloat($("#tab_total_amount").val()).toFixed(2);
    var dumbSplitTotal = ((actualTotal / numOwers).toFixed(2) * numOwers);
    var numTimes = dumbSplitTotal - actualTotal;
    if (dumbSplitTotal !== actualTotal) {
      $('.amount-each-field').each(function (amountStr) {
        var newSum = 0;
        debugger;
        $('.amount-each-field').each(function (index) {
          var parsedNum = that.strToNum($(this).text());
          newSum += parsedNum;
        });
        if (newSum == actualTotal) {
          return;
        }
        parsedNum = that.strToNum($(this).text());
        if (dumbSplitTotal > actualTotal) {
          $(this).text("$" + (parsedNum - 0.01).toFixed(2));
        } else if (dumbSplitTotal < actualTotal) {
          $(this).text("$" + (parsedNum + 0.01).toFixed(2));
        }
      });
    }

  },

  updateOwers: function (event) {
    var $target = $('#tab-friends').find('li:visible:first');
    var id = $target.data('id')
    var $iconTarget = $('[data-icon-id=' + id + ']');
    $('.even-ower').append($target.toggleClass('list-group-item').addClass('tab-ower'));
    $iconTarget.removeClass("glyphicon-plus").addClass('glyphicon-remove-circle');
    $('#tab-ower-field').val("");
    this.renderAmountField(id);
  },

  setOwedTabs: function () {
    $(".tab-ower")
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
          var targetAmount = that.strToNum($('[data-each-id=' + id + ']').text());
          if (CURRENT_USER.id === id) {
            return;
          }

          if (needNewTab) {
            var newTab = new TabSplitter.Models.UsersTab();
          } else {
            var newTab = TabSplitter.Collections.usersTabs.getOrFetch(that.model.id);
          }
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
        });

        Backbone.history.navigate("#", { trigger: true });
      }
    });
  }
});
