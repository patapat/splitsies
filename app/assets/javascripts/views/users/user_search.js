TabSplitter.Views.UserSearch = Backbone.View.extend({
  template: JST['users/search'],

  events: {
    'keyup #search-field': "updateResults",
    'click .search-items': "selectUser"
  },

  render: function () {
    var content = this.template({ users: this.collection });
    this.$el.html(content);

    return this;
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
    
  }
})
