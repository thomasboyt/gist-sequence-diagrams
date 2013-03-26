define(['templates'], function(templates) {
  var template = templates['static/templates/diagram.handlebars'];
  var DiagramView = Backbone.View.extend({
    render: function() {
      this.$el.html(template(_.extend({}, this.model.attributes)));
      this.$(".diagram").sequenceDiagram({theme: 'hand'});
      $(".editable").each(function() {
        var editor = ace.edit(this);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/text");
      });
      return this;
    }
  });

  return DiagramView
});
