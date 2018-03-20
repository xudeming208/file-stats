'use strict';

/**
 * @file output
 * @author xudeming208@126.com
 */

require('colors');

// output
module.exports = function (arr) {
	// 输出表格的大小，只要修改spaceNum即可
	var spaceNum = 12;

	var fileType = 'FileType';

	var sepNum = spaceNum * 5 + fileType.length + 20;
	var itemSpace = spaceNum + fileType.length - 1;
	var spaceRepeat = ' '.repeat(spaceNum);
	var sepRepeat = '-'.repeat(sepNum + spaceNum);

	var countTotal = 0;
	var lineTotal = 0;

	console.log('');
	console.log('');
	console.log('\u6587\u4EF6\u7EDF\u8BA1\u7ED3\u679C'.white);
	console.log('' + sepRepeat);
	console.log('' + spaceRepeat + fileType + spaceRepeat + spaceRepeat + '\u5355\u4F4D (\u4E2A)' + spaceRepeat + spaceRepeat + '\u5355\u4F4D (\u884C)');
	console.log('' + sepRepeat);

	var len = arr.length;
	// 无文件时
	if (!len) {
		console.log('' + ' '.repeat((sepNum + spaceNum) / 2 - 7), 'No File'.red);
	}

	// 输出Stat
	for (var i = 0; i < len; i += 3) {
		var type = arr[i];
		var count = arr[i + 1];
		var line = arr[i + 2];
		var countSpace = ' '.repeat(itemSpace - ('' + type).length);
		var lineSpace = ' '.repeat(itemSpace - ('' + count).length);

		console.log('' + spaceRepeat + type + countSpace + spaceRepeat, ('' + count).red, '' + spaceRepeat + lineSpace, ('' + line).red);

		countTotal += count;
		if (!isNaN(line)) {
			lineTotal += line;
		}
	}

	console.log('' + sepRepeat);
	console.log(spaceRepeat + 'total' + ' '.repeat(itemSpace - 'total'.length) + spaceRepeat, (countTotal + ' \u4E2A').red, '' + spaceRepeat + ' '.repeat(itemSpace - ('' + countTotal).length - 3), (lineTotal + ' \u884C').red);
	console.log('' + sepRepeat);
};