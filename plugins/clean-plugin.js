const { validate } = require('schema-utils')
const del = require('del')
const path = require("path");



const schema = {
    type: 'object',
    properties: {
        exclude: {
            type: 'string'
        }
    }
};

module.exports = class CleanPlugin {
    constructor(options = { exclude: '' }) {
        this.options = options;
        validate(schema, options, 'Clean Plugin')
    }

    apply(complier) {
        complier.hooks.emit.tapAsync('CleanPlugin', (compilation, callback) => {
            const base = complier.options.output.path.split(path.sep).join(path.posix.sep);
            const delFiles = [`${base}/**`, `!${base}/${this.options.exclude}`]

            // const delFiles = [`${complier.options.output.path}/**`, `!${complier.options.output.path}/${this.options.exclude}`]
            console.log(delFiles)
            del(delFiles)
                .then(() => {
                    callback()
                })
        })
    }
}