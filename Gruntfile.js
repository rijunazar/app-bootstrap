module.exports = function (grunt) {
    grunt.initConfig({
        paths: {
            source: './src',
            webroot: 'src/public',
            js: '<%=paths.webroot %>/app',
            assets: '<%=paths.webroot %>/assets',
            lib: '<%=paths.webroot %>/common',
            dist: '<%=paths.webroot %>/build'
        },
        browserify: {
            app: {
                files: [{
                    cwd: '.',
                    expand: true,
                    src: ['<%=paths.js %>/**/*.js'],
                    dest: '<%=paths.dist %>',
                    ext: '.js',
                    extDot: 'first'
                }],
                options: {
                    'transform': [
                        'debowerify',
                        'deglobalify',
                        'deamdify'
                    ],
                    'external': [
                        '<%=paths.lib %>/index.js'
                    ],
                    watch: true
                }
            },
            lib: {
                src: '<%=paths.lib %>/index.js',
                dest: '<%=paths.dist %>/lib.js',
                options: {
                    'transform': [
                        'debowerify',
                        'deglobalify',
                        'deamdify'
                    ]
                }
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
        }
    });


    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', [
        'browserify:app',
        'browserify:lib',
        'compass:dev'
    ]);
};
