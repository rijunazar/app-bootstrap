module.exports = function (grunt) {
    'use strict';
    var remapify = require('remapify');

    grunt.initConfig({
        paths: {
            webRoot: 'src/public',
            js: 'app/**/*.js', //relative to webRoot
            assets: '<%=paths.webRoot %>/assets',
            lib: '<%=paths.webRoot %>/common',
            dist: '<%=paths.webRoot %>/build'
        },
        browserify: {
            options: {
                preBundleCB: function (b) {
                    b.plugin(remapify, [{
                        src: './**/*.js', // glob for the files to remap
                        expose: 'common',
                        cwd: 'src/public/common'
                    }]);
                },
                'transform': [
                    'debowerify',
                    'deglobalify',
                    'deamdify'
                ]
            },
            app: {
                files: [{
                    cwd: '<%=paths.webRoot %>',
                    expand: true,
                    src: ['<%=paths.js %>'],
                    dest: '<%=paths.dist %>',
                    ext: '.js',
                    extDot: 'first'
                }],
                options: {
                    'external': [
                        '<%=paths.lib %>/lib.js'
                    ],
                    watch: true
                }
            },
            lib: {
                src: '<%=paths.lib %>/index.js',
                dest: '<%=paths.dist %>/lib.js'
            }
        },
        compass: {
            options: {
                sassDir: '<%=paths.assets %>/scss',
                cssDir: '<%=paths.dist %>/css',
                imagesDir: '<%= paths.assets %>/images',
                httpGeneratedImagesPath: '<%=paths.dist %>/images',
                importPath: ['bower_components/bootstrap-sass-official/assets/stylesheets']
            },
            dev: {}
        },
        clean: ['<%=paths.dist %>']
    });


    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', [
        'browserify:app',
        'browserify:lib',
        'compass:dev'
    ]);

    grunt.registerTask('rebuild', [
        'clean',
        'default'
    ]);
};
