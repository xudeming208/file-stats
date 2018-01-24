'use strict';

/**
 * @file output
 * @author xudeming208@126.com
 */

require('colors');

// output
module.exports = function (arr, isBufType) {
	// 输出表格的大小，只要修改spaceNum即可
	var spaceNum = 10;

	var fileType = 'FileType';
	var total = lineTotal;
	var countType = '单位 (行)';
	var tips = '文件行数统计：';

	// 特殊文件不计算行数，计算个数，如图片，视频等等
	if (isBufType) {
		total = countTotal;
		countType = '单位 (个)';
		tips = '文件个数统计：';
	}

	var sepNum = spaceNum * 4 + fileType.length + 15;
	var itemSpace = spaceNum + fileType.length - 1;
	var spaceRepeat = ' '.repeat(spaceNum);
	var sepRepeat = '-'.repeat(sepNum);

	console.log('');
	console.log('');
	console.log(('' + tips).white);
	console.log('' + sepRepeat);
	console.log('' + spaceRepeat + fileType + spaceRepeat + spaceRepeat + countType);
	console.log('' + sepRepeat);

	var len = arr.length;
	// 无文件时
	if (!len) {
		console.log('' + ' '.repeat(sepNum / 2 - 7), 'No File'.red);
	}

	// 输出Stat
	for (var i = 0; i < len; i += 2) {
		var type = arr[i];
		var line = arr[i + 1];
		var left = ' '.repeat(itemSpace - ('' + type).length);

		console.log('' + spaceRepeat + type + left + spaceRepeat, ('' + line).red);

		total += line;
	}

	var totalLen = ('' + total).length;

	console.log('' + sepRepeat);
	console.log(spaceRepeat + 'total' + ' '.repeat(itemSpace - 'total'.length) + spaceRepeat, ('' + total).red);
	console.log('' + sepRepeat);
};