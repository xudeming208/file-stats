'use strict';

/**
 * @file readFile
 * @author xudeming208@126.com
 */

require('colors');
var fs = require('fs');
var bufType = require('./bufType');

// 写入数组
var inputArr = function inputArr(arr, type, num) {
	if (!arr.includes(type)) {
		arr.push(type);
		arr.push(num);
	} else {
		// 如果之前已经统计了此类型，则直接将其line相加
		var index = arr.indexOf(type);
		arr[index + 1] += num;
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
				type = '*' + match[0].toLowerCase();
			}
	}

	// type太长的话截取
	if (type.length > 15) {
		type = type.substr(0, 15) + '...';
	}

	var unit = '个';
	var num = 1;

	// 统计各种类型文件的个数
	inputArr(countArr, type, num);

	// 统计各种类型文件的行数；特殊文件不计算行数，如图片，视频等等，只计算个数
	if (!bufType.includes(type)) {
		unit = '行';
		var content = '';
		try {
			content = fs.readFileSync(file, 'utf-8');
		} catch (e) {
			content = '';
		}
		// 获取行数
		num = content.split('\n').length;
		inputArr(lineArr, type, num);
	}
};