// Gist adapter

define([], function() {
  var apiUrl = "https://api.github.com/gists/";

  var File = Backbone.Model.extend();
  var FilesCollection = Backbone.Collection.extend({
    model: File
  });

  var getcb = function(resp, model, opts) {
    model.trigger("sync", model, resp);

    var files = new FilesCollection();

    for (name in resp.files) {
      var file = resp.files[name];
      files.add({
        filename: file.filename,
        content: file.content
      });
    }

    model.set({
      url: resp.url,
      files: files,
      description: resp.description
    });
  };

  var sync = function(method, model, options) {
    var type = {
      'create': 'POST',
      'update': 'PATCH',    // afaik, github only supports PATCH for gists, not UPDATE
      'patch':  'PATCH',
      'delete': 'DELETE',
      'read':   'GET'
    }[method];

    var cb = {
      //'POST': postcb,
      //'PATCH': patchcb,
      //'DELETE': deletecb,
      'GET': getcb
    }[type];

    options.success = function(resp) {
      cb(resp, model, options);
    };

    var params = {
      type: type,
      dataType: 'json'
    };

    var id;
    if (type == "PATCH" || type == "DELETE" || type == "GET") {
      if (model && model.get("id")) {
        id = model.get("id");
      }
      else if (options.id) {
        id = options.id;
      }
      else {
        throw new Error("An id must be specified when getting, updating, or deleting a Gist.");
      }
      params.url = apiUrl + id;
    }

    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  return sync;
});
