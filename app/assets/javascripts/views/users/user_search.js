TabSplitter.Views.UserSearch = Backbone.CompositeView.extend({
  template: JST['users/search'],

  initialize: function () {
    this.friendCollection = TabSplitter.Collections.usersFriends
    this.listenTo(this.friendCollection, "add remove sync", this.render);
    this.listenTo(this.collection, "add remove sync", this.renderUsers);
  },

  events: {
    'keyup #search-field': "updateResults",
    'click .search-items': "selectUser",
    'click button': "addUser"
  },

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);
    this.renderUsers();

    return this;
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
        that.addSubview('#search-items', userItemView);
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
  },

  selectUser: function (event) {
    var $target = $(event.currentTarget);

    if ($target.attr('class').indexOf("checked") > -1) {
      $target.removeClass("checked");
    } else {
      $target.addClass("checked");
    }
  },

  addUser: function (event) {
    event.preventDefault();
    $('.checked').each(function (index) {
      var newFriend = new TabSplitter.Models.UsersFriend()
      var forcedFriend = new TabSplitter.Models.UsersFriend()

      newFriend.set({
        "user_id": CURRENT_USER.id,
        "friend_id": $(this).data('id')
      });

      forcedFriend.set({
        "user_id": $(this).data('id'),
        "friend_id": CURRENT_USER.id
      });

      newFriend.save({}, {
        success: function () {
          TabSplitter.Collections.usersFriends.add(newFriend);
        }
      });

      forcedFriend.save({}, {
        success: function () {
          TabSplitter.Collections.usersFriends.add(newFriend);
          Backbone.history.navigate("users/" + CURRENT_USER.id, { trigger: true });
        }
      });
    });
  }
})
