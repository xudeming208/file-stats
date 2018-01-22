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

## Installation
- cli

```javascript
$ npm i file-stats -g
```
- nodejs

```javascript
$ npm i file-stats -S
```

## Usage
- Used as a command line tool.
 
 ```javascript
 file-stats -dir './'
 ```
- Use as nodejs module.
 
 ```javascript
 const fileStats = require('file-stats');
 
 fileStats({
	 	dir: "./"
 })
 ```

## Options
- Used as a command line tool.

```javascript
$ file-stats -h
```
```javascript

```

- Use as nodejs module.

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
