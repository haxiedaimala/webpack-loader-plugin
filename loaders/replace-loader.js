// require('loader-utils')

module.exports = function(source) {
    const options = this.getOptions()
    console.log(options.name)
    return source.replace(options.name, options.name.toUpperCase())
}