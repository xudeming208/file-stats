# file-stats 
  - 统计某个文件夹中文件的个数及行数
  - 由于`node_modules`文件夹很大且统计其无实际意义，所以程序强制不会统计`node_modules`文件夹，其中的文件数也不会计算到总共的文件个数中

## Example
```javascript
$ file-stats -dir './'
```

```javascript
此次统计的配置为：
{
  dir: './',
  excludeDir: /^$/,
  excludeFile: /(\.DS_Store\b|\.localized\b)$/,
  fileType: /(\.html\b|\.css\b|\.less\b|\.sass\b|\.js\b|\.ts\b|\.json\b|\.md\b|\.jpeg\b|\.jpg\b|\.png\b|\.gif\b|\.vue\b)$/i,
}


此文件夹中除了 node_modules 文件夹中总共有 1561 个文件，符合条件的有 148 个


文件个数统计：
-----------------------------------------------------------------------------------
               FileType                              单位 (个)
-----------------------------------------------------------------------------------
               *.md                                  3
               *.html                                6
               *.css                                 6
               *.js                                  49
               *.json                                4
               *.vue                                 71
               *.png                                 4
               *.gif                                 5
-----------------------------------------------------------------------------------
               total                                 148
-----------------------------------------------------------------------------------


文件行数统计：
-----------------------------------------------------------------------------------
               FileType                              单位 (行)
-----------------------------------------------------------------------------------
               *.md                                  69
               *.html                                149
               *.css                                 913
               *.js                                  4279
               *.json                                9250
               *.vue                                 22398
-----------------------------------------------------------------------------------
               total                                 37058
-----------------------------------------------------------------------------------
```

- 统计出来的FileType有三种形式：
  - **/file**：代表没有后缀名的文件，显示文件最后`/`后的字符，如`path/path/file`
  - **.file**：代表以`.`开头，并且没有后缀名的文件，如`.DS_Store`
  - ***.fileType**：正常有后缀名的文件，如：`path/path/test.js`；包含以.开头的正常的后缀文件，如：`path/path/.file.js`

- 如果FileType的长度超过15位，会截取前面15位加上`...`，如：`/file...`；`.file...`；`*.fileType...`


## Installation
- 作为命令行工具：

```javascript
$ npm i file-stats -g
```
- 作为nodejs模块：

```javascript
$ npm i file-stats -S
```

## Usage
- 作为命令行工具：

 - `$ file-stats -h`
 
 ```javascript
  Usage: index [options] <arguments>


  Options:

    -v, -V, --version                 output version number
    -u, --default                     Use the default config.
    -d, --dir <dir>                   Set the statistics folder.
    -e, --exclude-dir <excludeDir>    Exclude folder by regex. The default is: "/(/node_modules/)/i".
    -x, --exclude-file <excludeFile>  Exclude file by regex. The default is: "/(.DS_Store\b|.localized\b)$/i".
    -f, --file-type <fileType>        statistics fileType regex. The default is: "/(.html\b|.css\b|.less\b|.sass\b|.js\b|.ts\b|.json\b|.jpeg\b|.jpg\b|.png\b|.gif\b)$/i".
    -c, --config <config>             Use yours config.js, The config.js must be return an object.
    -h, --help                        output usage information


  Home: https://github.com/xudeming208/file-stats

  More: https://github.com/xudeming208/file-stats/blob/master/README.md

  Demo1: file-stats -d './' -f '/(.htm)$/i' -x '/(banner.html)/i' -e '/(/view/)/i'

  Demo2: file-stats -c './myConfig.js'
 ```
 
 - 配置某一个选项
 
 ```javascript
 file-stats -d './' -e '/^$/' -x '/^$/' -f '/(\.html\b|\.css\b)$/i'
 ```
 - 配置文件
 
 ```javascript
 file-stats -c config.js
 
 // 配置文件(`config.js`)必须是返回一个配置对象，如：
 module.exports = {
      dir: "./",
      excludeDir: /^$/,
      excludeFile: /(\.DS_Store\b|\.localized\b)$/,
      fileType: /(\.html\b|\.css\b)$/i
    }
 ```

- 作为nodejs模块：
 
 ```javascript
 const fileStats = require('file-stats');
 
 fileStats({
      dir: "./"
 })
 ```

## Options

```javascript
{
  // 统计哪个文件夹；默认为当前文件夹
  dir: "./",
  // 哪种文件夹中的文件不统计，规则为正则表达式；默认都统计（除了node_modules文件夹）
  // 由于node_modules文件夹很大且统计其无实际意义，所以程序强制不会统计node_modules文件夹，其中的文件数也不会计算到总共的文件个数中
  // 如果要排除test文件夹，可以设置为：excludeDir: /\/test\//
  excludeDir: /^$/,
  // 哪些文件不统计，规则为正则表达式；默认为.DS_Store、.localized
  // 如果不想排除，设置excludeFile: /^$/i
  excludeFile: /(\.DS_Store\b|\.localized\b)$/,
  // 统计哪种类型的文件，规则为正则表达式；默认包括html,css,less,sass,js,ts,json,md,jpeg,jpg,png,gif
  // 如果想统计所有类型，设置fileType:/.*/
  fileType: /(\.html\b|\.css\b|\.less\b|\.sass\b|\.js\b|\.ts\b|\.json\b|\.md\b|\.jpeg\b|\.jpg\b|\.png\b|\.gif\b)$/i
}
```
