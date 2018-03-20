'use strict';

/**
 * @file readFile
 * @author xudeming208@126.com
 */

require('colors');
var fs = require('fs');

// 写入数组
var inputArr = function inputArr(arr, type, count, line) {
	if (!arr.includes(type)) {
		arr.push(type);
		arr.push(count);
		arr.push(line);
	} else {
		// 如果之前已经统计了此类型，则直接将其line相加
		var index = arr.indexOf(type);
		arr[index + 1] += count;

		// 特殊文件不计算行数，如图片，视频等等，只计算个数
		if (countsOnly.test(type)) {
			arr[index + 2] = '--';
		} else {
			arr[index + 2] += line;
		}
	}
};

// 读取单个文件行数
module.exports = function (item, file) {
	// 取得文件类型
	var match = file.match(/(\.[^.\/]*)$/ig);

	var type = '';
	if (!match) {
		// 没有后缀名的文件，显示文件最后`/`后的字符，如`path/path/file`
		type = '/' + file.split('/').pop();
	} else {
		// 以`.`开头，并且没有后缀名的文件，如`.DS_Store`
		if (item.startsWith('.') && !item.substr(1).match(/\./g)) {
			type = match[0];
		}
		// 正常有后缀名的文件，如：`path/path/test.js`；包含以.开头的正常的后缀文件，如：`path/path/.file.js`
		else {
				type = '*' + match[0];
			}
	}

	// type太长的话截取
	if (type.length > 15) {
		type = type.substr(0, 15) + '...';
	}

	var count = 1;
	var line = 0;

	// 统计各种类型文件的行数；特殊文件不计算行数，如图片，视频等等，只计算个数
	if (!countsOnly.test(type)) {
		var content = '';
		try {
			content = fs.readFileSync(file, 'utf-8');
		} catch (e) {
			content = '';
		}
		// 获取行数
		line = content.split('\n').length;

		// output files
		console.log('file\uFF1A'.white, '' + file, (' ' + line + ' \u884C').red);
	} else {
		// output files
		console.log('file\uFF1A'.white, '' + file, ' 1 \u4E2A'.red);
	}

	inputArr(statsArr, type, count, line);
};