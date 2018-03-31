module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "lib/**/*.ts"
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript"
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};