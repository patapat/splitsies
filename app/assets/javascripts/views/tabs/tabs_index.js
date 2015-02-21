TabSplitter.Views.TabsIndex = Backbone.CompositeView.extend({
  template: JST['tabs/index'],

  initialize: function () {
    // this.listenTo(this.collection, "remove sync add change:title", this.render)
  },

  events: {
    "click .glyphicon-chevron-right": "renderDetails",
    "click .glyphicon-chevron-down": "hideDetails",
    "click button": "tabShow",
    "click .table-header": "sortTable",
    "click #owed-tabs": "renderOwedTabs",
    "click #your-tabs": "render"
  },

  sortTable: function (event) {
    console.log("sort");
    TabSplitter.Collections.tabs._comparator = $(event.currentTarget).html().toLowerCase();
    TabSplitter.Collections.tabs.sort();
  },

  render: function () {
    var content = this.template({ tabs: this.collection, paid: this.allTabsPaid() });
    this.$el.html(content);
    this.$('.email-popover').popover();
    return this;
  },

  allTabsPaid: function () {
    var paid = true;
    this.model.userTabs().each(function (userTab) {
      if (userTab.get('paid')) {
        return;
      } else {
        paid = false;
      }
    });

    return paid;
  },

  renderOwedTabs: function () {
    // var currentUser = TabSplitter.Collections.users.getOrFetch(CURRENT_USER.id);
    var owedTabView = new TabSplitter.Views.OwedTab({ model: this.model });

    this._swapTabView(owedTabView);
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

  tabShow: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    var id = $target.data('id');
    Backbone.history.navigate("tabs/" + id, { trigger: true })
  },

  _swapTabView: function (view) {
    $("#tabs-table").html(view.render().$el);
  }
})
