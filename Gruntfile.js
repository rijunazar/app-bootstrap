module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            app: {
                files: [{
                    expand: true,
                    cwd: './src/public/',
                    src: ['app/**/*.js'],
                    dest: 'src/public/build/',
                    ext: '.min.js',
                    extDot: 'first'
                }],
                options: {
                    'transform': [
                        'debowerify',
                        'deglobalify',
                        'deamdify'
                    ],
                    'external': [
                        'src/public/common/vendor.js'
                    ],
                    watch: true
                }
            },
            lib: {
                src: 'src/public/common/vendor.js',
                dest: 'src/public/build/lib.js',
                options: {
                    'transform': [
                        'debowerify',
                        'deglobalify',
                        'deamdify'
                    ]
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', [
        'browserify:app',
        'browserify:lib'
    ]);
};
