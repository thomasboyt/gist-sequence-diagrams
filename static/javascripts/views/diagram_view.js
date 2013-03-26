define(['templates'], function(templates) {
  var gistTemplate = templates['static/templates/gist.handlebars'];
  var diagramTemplate = templates['static/templates/diagram.handlebars'];

  // todo: split out individual files to some sort of FileView
  var DiagramView = Backbone.View.extend({
    render: function() {
      this.$el.html(gistTemplate(this.model.attributes));

      this.model.get("files").each(function(file) {
        var html = diagramTemplate(file.attributes);
        var $el = $(html).appendTo(this.$(".files"));
        var diagramDiv = $(".diagram", $el);
        diagramDiv.sequenceDiagram({theme: 'hand'});

        var editor = ace.edit($(".editable", $el)[0]);
        editor.setTheme("ace/theme/monokai");

        editor.getSession().on('change', _.debounce(function(e) {
          var newValue = editor.getValue();
          var diagram = Diagram.parse(newValue);
          diagramDiv.html("");
          diagram.drawSVG(diagramDiv.get(0));
          file.set("content", newValue);
        }, 350));
      });
      return this;
    }
  });

  return DiagramView
});
