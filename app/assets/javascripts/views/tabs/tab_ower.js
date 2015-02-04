TabSplitter.Views.TabOwer = Backbone.CompositeView.extend({
  template: JST['tabs/add_ower'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    
    return this;
  }
});
