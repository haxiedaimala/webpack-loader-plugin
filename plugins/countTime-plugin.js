module.exports = class CountTimePlugin {
    apply(compiler) {
        let self = this
        compiler.hooks.entryOption.tap('CountTimePlugin', (context, entry) => {
            self.startTime = Date.now()
            console.log('start....')
        });
        compiler.hooks.done.tap('CountTimePlugin', (compilation) => {
            console.log('end...')
            self.endTime = Date.now()
            console.log(`编译耗时：${self.endTime-self.startTime} ms`)
        });
    }
}