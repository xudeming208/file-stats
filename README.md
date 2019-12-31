<h1 align="center">
  file-stats
</h1>
<br>
<p align="center">
  <a href="https://travis-ci.org/xudeming208/file-stats"><img src="https://travis-ci.org/xudeming208/file-stats.svg?branch=master" alt="Travis Status"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/node/v/file-stats.svg" alt="Nodejs"></a>
  <a href="https://www.npmjs.com/package/file-stats"><img src="https://img.shields.io/npm/v/file-stats.svg" alt="Version"></a>
  <a href="https://npmcharts.com/compare/file-stats?minimal=true"><img src="https://img.shields.io/npm/dm/file-stats.svg" alt="Downloads"></a>
  <a href="https://github.com/xudeming208/file-stats/graphs/contributors"><img src="https://img.shields.io/github/contributors/xudeming208/file-stats.svg" alt="Contributors"></a>
  <a href="https://www.npmjs.com/package/file-stats"><img src="https://img.shields.io/github/license/xudeming208/file-stats.svg" alt="License"></a>
</p>

# Introduction 
  - 统计某些文件夹中文件的个数及行数
  - 由于`node_modules`文件夹很大且统计其无实际意义，所以程序强制不会统计`node_modules`文件夹，其中的文件数也不会计算到总共的文件个数中

## Example
```javascript
$ file-stats -d
$ file-stats --path "['./']"
$ fst -p "['./', '../mid']"
```
 
```javascript
此次统计的配置为：
{
   path : ["./","../mid"],
   excludePath : [],
   excludeFile : [".DS_Store",".localized","npm-debug.log"],
   fileType : ["html","css","less","sass","js","jsx","ts","tsx","json","md","txt","py","class","java","jsp","php","node","jpeg","jpg","png","gif","mp3","mp4"],
   countsOnly : ["jpeg","jpg","png","gif","mp3","mp4"],
}


此文件夹中除了 node_modules 文件夹中总共有 701 个文件，符合条件的有 119 个


文件统计结果
----------------------------------------------------------------------------------------------------
            FileType                        单位 (个)                        单位 (行)
----------------------------------------------------------------------------------------------------
            *.md                            8                                830
            *.js                            64                               17437
            *.json                          4                                168
            *.html                          16                               591
            *.png                           3                                --
            *.less                          22                               1069
            *.jpg                           1                                --
            *.gif                           1                                --
----------------------------------------------------------------------------------------------------
            total                           119 个                           20095 行
----------------------------------------------------------------------------------------------------
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
#### 作为命令行工具：

 - `$ fst -h`
 
 ```javascript
  Usage: index [options] <arguments>

  Options:
    -v, --version                     查看版本号
    -d, --default                     用默认的配置统计
    -p, --path <path>                 [数组]统计哪些文件夹？
    -e, --exclude-path <excludePath>  [数组]在path文件夹中排除哪些文件夹？
    -x, --exclude-file <excludeFile>  [数组]在path文件夹中排除哪些文件？
    -f, --file-type <fileType>        [数组]在path文件夹中统计哪些文件类型？包括其个数和行数的统计
    -o, --counts-only <countsOnly>    [数组]fileType的子集。在fileType规定的文件类型中，哪些文件类型不统计行数(比如图片、视频等)，只统计其个数
    -c, --config <config>             [须返回对象]用自定义的配置文件统计。配置文件必须返回一个对象，参考README.md
    -h, --help                        output usage information


    Home: https://github.com/xudeming208/file-stats

    Doc: https://github.com/xudeming208/file-stats/blob/master/README.md

    demo1: file-stats -d

    demo2: fst -d

    demo3: file-stats -p "['./']" -e "['view', 'test']" -x "['index.html', 'index.js']" -f "['html', 'js', 'css', 'jpg']" -o "['jpg']"

    demo4: file-stats -c './myConfig.js'
 ```
 
 - 配置某一个选项
 
 ```javascript
 fst -p "['./']" -e "['view', 'test']" -x "['index.html', 'index.js']" -f "['html', 'js', 'css', 'jpg']" -o "['jpg']""
 ```

 - 如果要统计swf的个数，不统计其行数，则设置：
 
 ```javascript
 fst -p "['./']" -f "['swf']" -o "['swf']"
 ```

 - 配置文件
 
 ```javascript
 fst -c config.js
 
 // 配置文件(`config.js`)必须是返回一个配置对象，如：
  module.exports = {
    path: ['./', '../mid'],
    excludePath: [],
    excludeFile: ['.DS_Store', '.localized', 'npm-debug.log'],
    fileType: ['html', 'css', 'less', 'sass', 'js', 'jsx', 'ts', 'tsx', 'json', 'md', 'txt', 'py', 'class', 'java', 'jsp', 'php', 'node', 'jpeg', 'jpg', 'png', 'gif', 'mp3', 'mp4'],
    countsOnly: ['jpeg', 'jpg', 'png', 'gif', 'mp3', 'mp4']
  }
 ```

#### 作为nodejs模块：
 
 ```javascript
 const fileStats = require('file-stats');
 
 fileStats({
      path: ['./']
 })
 ```

## Options

```javascript
{
  // 描述：统计哪些文件夹
  // 类型：数组；
  // 例子：['./', '../test', '/Users/xudeming']
  // 备注：区分大小写，可以为相对目录和绝对目录
  path: ['./'],
  // 描述：在path文件夹中排除哪些文件夹
  // 类型：数组；
  // 例子：排除path文件夹下所有的test文件夹、上一级目录的a文件夹和带根目录的b文件夹 => ['test', '../a', '/Users/xudeming/Documents/xdm/file-stats/b']
  // 备注：区分大小写；为空数组时，代表不排除任何文件夹；数组元素可以为文件夹名，也可以为相对目录文件夹名和绝对目录的文件夹名；强制不统计node_modules文件夹
  excludePath: [],
  // 描述：在path文件夹中排除哪些文件
  // 类型：数组；
  // 例子：排除path文件夹下所有的test.js文件、上一级目录的a.html和带根目录的b.css => ['test.js', '../a.html', '/Users/xudeming/Documents/xdm/file-stats/b.css']
  // 备注：区分大小写；为空数组时，代表不排除任何文件；数组元素可以为文件名，也可以为相对目录文件名和绝对目录的文件名
  excludeFile: ['.DS_Store', '.localized', 'npm-debug.log'],
  // 描述：在path文件夹中统计哪些文件类型，包括其个数和行数的统计
  // 类型：数组；
  // 例子：['html', 'css', 'js']
  // 备注：不区分大小写；为空数组时，代表不统计任何文件；如果想统计所有类型，设置fileType: ['*']
  fileType: ['html', 'css', 'less', 'sass', 'js', 'jsx', 'ts', 'tsx', 'json', 'md', 'txt', 'py', 'class', 'java', 'jsp', 'php', 'node', 'jpeg', 'jpg', 'png', 'gif', 'mp3', 'mp4'],
  // 描述：fileType的子集，在fileType规定的文件类型中，哪些文件类型不统计行数(某些类型的文件统计其行数无意义)，只统计其个数
  // 类型：数组；
  // 例子：['jpg', 'mp4']
  // 备注：不区分大小写；为空数组时，代表fileType规定的类型都会统计行数，包括jpeg、png、mp4等
  countsOnly: ['jpeg', 'jpg', 'png', 'gif', 'mp3', 'mp4']
}
```
