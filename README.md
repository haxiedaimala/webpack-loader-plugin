# webpack-loader-plugin
手写webpack的markdown的loader，clean-dist的plugin，以及记录编译时长的plugin

## loader
### replace-loader
1. 先配置好基本的信息，写好基本的index.js index.css a.js，自动创建html标签（使用模版）

![image](https://user-images.githubusercontent.com/90816853/165520306-bc5cba76-65a2-4aea-b757-b08c0b475d54.png)

2. 书写replace-loader.js

- 目的：替换所有的 某类型文件 里面的 特定字样  
- 例如：替换所有的 .js文件里面的 hello字样 为大写HELLO
- 关键：获取webpack.config.js 文件里面使用该loader时，设置的options的替换字样（name值）

![image](https://user-images.githubusercontent.com/90816853/165520454-eed34b91-7d76-43a9-88ed-9654c696ed2b.png)
![image](https://user-images.githubusercontent.com/90816853/165520471-a3a988d7-6901-4e02-846e-daa3e96c1f60.png)


### markdown-loader
1. 先配置好基本的信息，写好基本的index.js index.css a.js，自动创建html标签（使用模版）
2. 书写 markdown-loader.js
- 目的：通过markdown书写文章，之后利用该loader进行处理，将markdown自动变为html语句，并且将html引入我们的模版文件中，达到通过markdown书写，完成页面的内容结构
- 关键：
  1. 在webpack.config.js文件中使用HtmlWebpackPlugin插件自动创建模版文件
  2. 在模版文件中，引入我们的markdown文件 
  3. 在markdown-loader组件中，利用了npm库中的markdown-it包进行markdown转html

![image](https://user-images.githubusercontent.com/90816853/165520646-f2177a7b-fa30-492a-bc9b-2d382f01a7a7.png)
![image](https://user-images.githubusercontent.com/90816853/165520661-c83f779a-3ad6-4c54-92fd-5b844970b323.png)
![image](https://user-images.githubusercontent.com/90816853/165520687-f66df263-8362-4a72-8b32-6de3c4fb5359.png)

书写完成后会出现以下效果：

![image](https://user-images.githubusercontent.com/90816853/165520729-f89564d9-1b28-4a77-b6f6-dd69a276ca87.png)

**出现错误**

页面内没有出现html标签解析后的内容效果，而是展示了结果
当我们在markdown-loader文件中console.log(md.render(source))会输出：

![image](https://user-images.githubusercontent.com/90816853/165520824-993e6a38-4b8c-4255-bcd0-df8f79b75ca1.png)

说明把markdown已经变成了html标签，那可能就是在引入模版文件时出现了问题

**错误原因**

经过在网上一番查找，借鉴别人的答案。
因为file-loader@6.0.0版本中，为了优化性能新增了一个关键的配置项esModule 。这个配置项的作用，是指定引入文件的方式，是否指定es module的形式引入（也就是类似 improt name from ‘url’）这个配置项默认值是true，如果是true的情况下，那再引用时就会出现上面的问题。

**解决办法**

将esModule设置为false

![image](https://user-images.githubusercontent.com/90816853/165521057-de84a488-7455-4f46-b354-482bc8508810.png)


## plugin
### clean-plugin

- 目的：清空dist文件夹的插件，每次执行的时候，生成新的文件。但是保留某些文件不清理（例如 .git文件夹，这里记录管理我们项目，及上传github的配置，如果清理了，那之后管理的时候或者上传github时，需要重新配置）
- 关键：
  1. 使用了npm库的del包，可以删除路径下的所有文件，保留某些文件
  2. 监测compiler编译器在**导出到dist文件的状态之前**，执行除去保留文件全部删除

![image](https://user-images.githubusercontent.com/90816853/165521356-89805670-b522-4b0c-941e-0e075f7fb735.png)
![image](https://user-images.githubusercontent.com/90816853/165521371-7cdb4baa-d4a2-42c9-bd84-9ac2792f83d4.png)

**出现错误**：

结果发现：dist文件夹下的内容确实被清空了，但是并没有保留hello.js文件，输出delFiles后，发现路径为：

![image](https://user-images.githubusercontent.com/90816853/165521452-081c24d1-f696-47ac-94d7-bc1c7909af19.png)

**错误原因**

很可能是path路径在不同环境下的写法不同

**解决办法**：

将插件的路径修改为：

![image](https://user-images.githubusercontent.com/90816853/165521561-63f9e206-dfa8-4247-9b31-1bfb4cfd17e7.png)

输出后发现：

![image](https://user-images.githubusercontent.com/90816853/165521604-46296028-e6ca-4109-a3ed-bbf418d723aa.png)

**出现错误**：

路径正确，但是依然没有保留hello文件
观察配置文件后，发现：在配置项目文件时，我们使用了webpack打包工具自带的clean：true，导致了全部清空

**解决办法**

因此删除clean：true，在调用自定义的clean插件即可即可


### count-time-plugin

记录编译时长

关键：记录compiler编译器在不同编译状态下的时间，最早编辑状态：entryOption，导出文件的状态：done

![image](https://user-images.githubusercontent.com/90816853/165521738-61b8e957-8cc2-4aef-a6b4-f24bf34e7a24.png)
