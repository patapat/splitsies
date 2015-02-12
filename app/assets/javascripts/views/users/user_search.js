TabSplitter.Views.UserSearch = Backbone.CompositeView.extend({
  template: JST['users/search'],

  className: "search-view",

  initialize: function () {
    this.friendCollection = TabSplitter.Collections.usersFriends
    this.listenTo(this.friendCollection, "add remove", this.render);
    this.listenTo(this.collection, "add remove", this.renderUsers);
  },

  events: {
    'keyup #search-field': function (e) {
      this.updateResults(e);
      this.toggleDisplay(e);
    },
    'keypress #search-field': function (e) {
      var code = e.keyCode || e.which;
      if (code == 13) {
        this.addUser(e);
      }
    },
    'click .search-items': "toggleUser"
    // 'click button': "addUser"
  },

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);
    this.renderUsers();

    return this;
  },

  toggleDisplay: function () {
    if ($('#search-field').val() === "") {
      $('#search-results').css("display", "none");
      var $currentResults = $('.search-items');
      $currentResults.each(function (index) {
        $(this).removeClass("checked");
        var id = $(this).data('id')
        var $iconTarget = $('[data-icon-id='+ id + ']');
        $iconTarget.addClass("glyphicon-unchecked").removeClass("glyphicon-check");
      });
    } else {
      $('#search-results').css("display", "block");
    }
  },

  renderUsers: function () {
    var that = this;
    var currentFriends = [CURRENT_USER.id]
    this.collection.get(CURRENT_USER.id).friends().each(function (friend) {
      currentFriends.push(friend.id)
    });

    var users = this.collection;
    users.each(function (user) {
      var userItemView = new TabSplitter.Views.SearchItem({ model: user });

      if (currentFriends.indexOf(user.id) === -1) {
        that.addSubview('#search-item-field', userItemView);
      }
    })
  },

  updateResults: function () {
    var currentSearch = $('#search-field').val();
    var $currentResults = $('.search-items');

    $currentResults.each(function (index) {
      if ($(this).text().indexOf(currentSearch) === -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });

    var $target = $('#search-item-field').find('li:visible:first')
    var id = $target.data('id');
    var $iconTarget = $('[data-icon-id='+ id + ']');
    $target.addClass("checked");
    $iconTarget.addClass("glyphicon-check").removeClass("glyphicon-unchecked");
  },

  toggleUser: function (event) {
    var $target = $(event.currentTarget);
    var id = $target.data('id');
    var $iconTarget = $('[data-icon-id='+ id + ']');
    $target.toggleClass("checked");
    $iconTarget.toggleClass("glyphicon-check glyphicon-unchecked");
  },

  addUser: function (event) {
    // event.preventDefault();
    var $target = $('#search-item-field').find('li:visible:first');
    var newFriendship = new TabSplitter.Models.UsersFriend()
    var forcedFriendship = new TabSplitter.Models.UsersFriend()
    var that = this;

    newFriendship.set({
      "user_id": CURRENT_USER.id,
      "friend_id": $target.data('id')
    });

    forcedFriendship.set({
      "user_id": $target.data('id'),
      "friend_id": CURRENT_USER.id
    });

    newFriendship.save({}, {
      success: function () {
        var friend = that.collection.get(newFriendship.get('friend_id'));
        that.collection.get(CURRENT_USER.id).friends().add(friend);
        TabSplitter.Collections.usersFriends.add(newFriendship);
      }
    });

    forcedFriendship.save({}, {
      success: function () {
        TabSplitter.Collections.usersFriends.add(forcedFriendship);
      }
    });
  }
})
