TabSplitter.Views.TabForm = Backbone.CompositeView.extend({
  className: "tab-form-main",

  template: JST['tabs/form'],

  events: {
    "submit form": "createTab",
    "change #tab_total_amount": "update"
  },

  render: function () {
    var content = this.template({ tab: this.model })
    this.$el.html(content);

    return this;
  },

  createTab: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    var that = this;
    var formData = $target.serializeJSON();

    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model);
        Backbone.history.navigate("#/tabs/" + that.model.id, { trigger: true });
      }
    });
  },

  update: function () {
    $('.amount-owed').html("$" + $('#tab_total_amount').val())
  }
});
