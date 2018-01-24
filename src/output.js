'use strict';

/**
 * @file output
 * @author xudeming208@126.com
 */

require('colors');

// output
module.exports = (arr, isBufType) => {
	// 输出表格的大小，只要修改spaceNum即可
	let spaceNum = 15;

	let fileType = 'FileType';
	let total = lineTotal;
	let countType = '单位 (行)';
	let tips = '文件行数统计：';

	// 特殊文件不计算行数，计算个数，如图片，视频等等
	if (isBufType) {
		total = countTotal;
		countType = '单位 (个)';
		tips = '文件个数统计：';
	}

	let sepNum = spaceNum * 4 + fileType.length + 15;
	let itemSpace = spaceNum + fileType.length -1;
	let spaceRepeat = ' '.repeat(spaceNum);
	let sepRepeat = '-'.repeat(sepNum);

	console.log(``);
	console.log(``);
	console.log(`${tips}`.white);
	console.log(`${sepRepeat}`);
	console.log(`${spaceRepeat}${fileType}${spaceRepeat}${spaceRepeat}${countType}`);
	console.log(`${sepRepeat}`);

	let len = arr.length;
	// 无文件时
	if (!len) {
		console.log(`${' '.repeat(sepNum/2-7)}`,`No File`.red);
	}

	// 输出Stat
	for (let i = 0; i < len; i += 2) {
		let type = arr[i];
		let line = arr[i + 1];
		let left = ' '.repeat(itemSpace - ('' + type).length);

		console.log(`${spaceRepeat}${type}${left}${spaceRepeat}`, `${line}`.red);

		total += line;
	}

	let totalLen = ('' + total).length;

	console.log(`${sepRepeat}`);
	console.log(`${spaceRepeat}total${' '.repeat(itemSpace-'total'.length)}${spaceRepeat}`, `${total}`.red);
	console.log(`${sepRepeat}`);
}