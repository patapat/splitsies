TabSplitter.Views.TabsIndex = Backbone.CompositeView.extend({
  template: JST['tabs/index'],

  initialize: function () {
    this.listenTo(this.collection, "remove sync add change:title", this.render)
  },

  events: {
    "click .glyphicon-chevron-right": "renderDetails",
    "click .glyphicon-chevron-down": "hideDetails",
    "click .tab-row-item": "tabShow"
  },

  render: function () {
    var content = this.template({ tabs: this.collection })
    this.$el.html(content);
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

  renderDetails: function (event) {
    var $iconTarget = $(event.currentTarget);
    var id = $iconTarget.data('id');
    $iconTarget.removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
    var $tabRow = $('#tab-row-' + id).append($())
  },

  hideDetails: function (event) {
    var $iconTarget = $(event.currentTarget);
    $iconTarget.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
  },

  tabShow: function () {
    console.log("tab show")
  }
})
