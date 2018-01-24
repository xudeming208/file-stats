# file-stats 
  - 统计某个文件夹中文件的个数及行数

## Example
```javascript
$ file-stats -dir './'
```

```javascript
此文件夹下总共有 5225 个文件，符合条件的有 92 个


FileType Numbers Count：
---------------------------------------------------------------
          FileType                    Unit (numbers)
---------------------------------------------------------------
          *.js                        49
          *.html                      16
          *.png                       2
          *.less                      22
          *.json                      3
---------------------------------------------------------------
          total                       92
---------------------------------------------------------------


FileType Lines Count：
---------------------------------------------------------------
          FileType                    Unit (lines)
---------------------------------------------------------------
          *.js                        16228
          *.html                      598
          *.less                      1068
          *.json                      122
---------------------------------------------------------------
          total                       18016
---------------------------------------------------------------
```

- 统计出来的FileType有三种形式：
  - **/file**：代表没有后缀名的文件，file-stats显示文件最后`/`后的字符，如`path/path/file`
  - **/...0b44f6ffae**：代表文件名太长（通常是没有后缀名的文件），进行了截取
  - **.file**：代表以`.`开头，并且没有后缀名的文件，如`.DS_Store`
  - ***.js**：代表正常有后缀名的文件，如：`path/path/test.js`；包含以.开头的正常的后缀文件，如：`path/path/.file.js`


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
 file-stats -d './' -e '/^$/i' -x '/^$/i' -f '/(\.html\b|\.css\b)$/i'
 ```
 - 配置文件
 
 ```javascript
 file-stats -c config.js
 ```
 配置文件(`config.js`)必须是返回一个配置对象，如：
 
 ```javascript
module.exports = {
    dir: "./",
    excludeDir: /(\/node_modules\/)/i,
    excludeFile: /(\.DS_Store\b|\.localized\b)$/i,
    fileType: /(\.html\b|\.css\b|\.less\b|\.sass\b|\.js\b|\.ts\b|\.json\b|\.md\b|\.jpeg\b|\.jpg\b|\.png\b|\.gif\b)$/i
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
  // 哪种文件夹中的文件不统计，规则为正则表达式；默认为node_modules
  // 如果不想排除，设置excludeDir: /^$/i
  excludeDir: /(\/node_modules\/)/i,
  // 哪些文件不统计，规则为正则表达式；默认为.DS_Store、.localized
  // 如果不想排除，设置excludeFile: /^$/i
  excludeFile: /(\.DS_Store\b|\.localized\b)$/i,
  // 统计哪种类型的文件，规则为正则表达式；默认包括html,css,less,sass,js,ts,json,jpeg,jpg,png,gif
  // 如果想统计所有类型，设置fileType:/.*/
  fileType: /(\.html\b|\.css\b|\.less\b|\.sass\b|\.js\b|\.ts\b|\.json\b|\.jpeg\b|\.jpg\b|\.png\b|\.gif\b)$/i
}
```
