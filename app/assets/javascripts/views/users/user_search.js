TabSplitter.Views.UserSearch = Backbone.CompositeView.extend({
  template: JST['users/search'],

  initialize: function () {
    this.friendCollection = TabSplitter.Collections.usersFriends
    this.listenTo(this.friendCollection, "add remove", this.render);
    this.listenTo(this.collection, "add remove", this.renderUsers);
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
    var that = this;
    $('.checked').each(function (index) {
      var newFriendship = new TabSplitter.Models.UsersFriend()
      var forcedFriendship = new TabSplitter.Models.UsersFriend()

      newFriendship.set({
        "user_id": CURRENT_USER.id,
        "friend_id": $(this).data('id')
      });

      forcedFriendship.set({
        "user_id": $(this).data('id'),
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
    });
  }
})
