TabSplitter.Views.TabForm = Backbone.CompositeView.extend({
  initialize: function () {
  },

  className: "tab-form-main",

  template: JST['tabs/form'],

  events: {
    // "submit form": "createOrUpdateTab",
    "keyup .new-form": function(e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        e.preventDefault();
        return false;
      }
    },
    "keypress .new-form": function(e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        e.preventDefault();
        return false;
      }
    },
    'keydown #search-field': function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        this.renderAlert();
      }
    },
    'keyup #tab-ower-field': "updateResults",
    'click #new-even': "renderNewEven",
    'click #new-custom': "renderNewCustom",
    'click #edit-even': "renderEditEven",
    'click #edit-custom': "renderEditCustom"
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  },

  renderAlert: function () {
    $('#friend-alert').fadeIn(2000).fadeOut(1000);
  },

  renderNewEven: function () {
    var tab = new TabSplitter.Models.Tab();

    var newEvenView = new TabSplitter.Views.TabFormEven({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(newEvenView);
    $('#tab_title').focus();
  },

  renderNewCustom: function () {
    var tab = new TabSplitter.Models.Tab();

    var newCustomView = new TabSplitter.Views.TabFormCustom({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(newCustomView);
    $('#tab_title').focus();
  },

  renderEditEven: function () {
    var tab = TabSplitter.Collections.tabs.getOrFetch(this.model.id);

    var editEvenView = new TabSplitter.Views.TabFormEven({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(editEvenView);
    $('#tab_title').focus();
  },

  renderEditCustom: function () {
    var tab = TabSplitter.Collections.tabs.getOrFetch(this.model.id);

    var editCustomView = new TabSplitter.Views.TabFormCustom({
      model: tab,
      collection: TabSplitter.Collections.tabs
    });

    this._swapFormView(editCustomView);
    $('#tab_title').focus();
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
              if (!TabSplitter.Collections.usersTabs.contains(newTab)) {
                TabSplitter.Collections.usersTabs.add(newTab);
              }
            }
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
  },

  _swapFormView: function (view) {
    $("#tab-type-main").html(view.render().$el);
  }

});
