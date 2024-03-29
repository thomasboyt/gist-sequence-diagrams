module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib');

  grunt.initConfig({
    handlebars: {
      compile: {
        files: {
          "static/javascripts/templates.js": ["static/templates/**/*.handlebars"]
        },
        options: {
          amd: true
        }
      }
    },
    less: {
      compile: {
        files: {
          "static/stylesheets/out.css": ["static/stylesheets/**/*.less"],
        },
      },
      min: {
        files: {
          "static/min/out.min.css": ["static/stylesheets/**/*.less"],
        },
        options: {
          "compress": true
        }
      }
    },
    /*requirejs: {
      compile: {
        options: {
          baseUrl: "./static/javascripts/",
          name: "chat",
          paths: {
            "requireLib": "lib/require"
          },
          include: ["requireLib"],
          out: "./static/min/app.min.js",
          optimize: "uglify"
        }
      }
    },*/
    /*cssmin: {
      compress: {
        files: {
          "static/min/lib.min.css": [
            "static/bootstrap/css/bootstrap.min.css", 
            "static/stylesheets/font-awesome.min.css"
          ]
        }
      }
    },*/
    /*uglify: {
      compile: {
        files: {
          "static/min/lib.min.js": [
            "static/javascripts/lib/jquery-1.9.1.min.js",
            "static/javascripts/lib/underscore.js",
            "static/javascripts/lib/backbone.js",
          ]
        }
      }
    },*/
    watch: {
      templates: {
        files: "static/templates/**/*.handlebars",
        tasks: ['handlebars:compile']
      },
      stylesheets: {
        files: "static/stylesheets/**/*.less",
        tasks: ['less:compile']
      }
    }
  });

  grunt.registerTask('auto', ['watch']);
  //grunt.registerTask('build', ['cssmin:compress', 'uglify:compile', 'handlebars:compile', 'requirejs:compile', 'less:min']);
  grunt.registerTask('default', 'auto');

};

