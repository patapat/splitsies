TabSplitter.Views.Sidebar = Backbone.CompositeView.extend({
  template: JST['navs/sidebar'],

  events: {
    "click li": "activateSidebarItem"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  activateSidebarItem: function (event) {
    var $target = $(event.currentTarget);
    $(".active").removeClass("active");
    $target.addClass("active");
  }
});
