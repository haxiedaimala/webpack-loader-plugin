require('loader-utils')
const validateOptions = require('schema-utils')
const MarkdownIt = require('markdown-it')

const schema = {
    type: 'object',
    properties: {
        html: { type: 'boolean' },
        linkify: { type: 'boolean' },
        xhtmlOut: { type: 'boolean' },
        langPrefix: { type: 'boolean' },
    }
}

module.exports = function(source) {
    const options = this.getOptions()
    const md = MarkdownIt(options)
    validateOptions.validate(schema, options)

    // 同步操作，可以使用callback函数，返回多个参数值，但是第一个值必须是错误信息（若无：为null）
    // this.callback(null, md.render(source))

    // 同步操作，返回一个参数值
    // return md.render(source) 

    // 异步操作
    let callback = this.async()
    setTimeout(() => {
        callback(null, md.render(source))
    }, 0)
}
