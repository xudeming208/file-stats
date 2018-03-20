'use strict';

/**
 * @file output
 * @author xudeming208@126.com
 */

require('colors');

// output
module.exports = arr => {
	// 输出表格的大小，只要修改spaceNum即可
	let spaceNum = 12;

	let fileType = 'FileType';

	let sepNum = spaceNum * 5 + fileType.length + 20;
	let itemSpace = spaceNum + fileType.length - 1;
	let spaceRepeat = ' '.repeat(spaceNum);
	let sepRepeat = '-'.repeat(sepNum + spaceNum);

	let countTotal = 0;
	let lineTotal = 0;

	console.log(``);
	console.log(``);
	console.log(`文件统计结果`.white);
	console.log(`${sepRepeat}`);
	console.log(`${spaceRepeat}${fileType}${spaceRepeat}${spaceRepeat}单位 (个)${spaceRepeat}${spaceRepeat}单位 (行)`);
	console.log(`${sepRepeat}`);

	let len = arr.length;
	// 无文件时
	if (!len) {
		console.log(`${' '.repeat((sepNum + spaceNum)/2-7)}`, `No File`.red);
	}

	// 输出Stat
	for (let i = 0; i < len; i += 3) {
		let type = arr[i];
		let count = arr[i + 1];
		let line = arr[i + 2];
		let countSpace = ' '.repeat(itemSpace - ('' + type).length);
		let lineSpace = ' '.repeat(itemSpace - ('' + count).length);

		console.log(`${spaceRepeat}${type}${countSpace}${spaceRepeat}`, `${count}`.red, `${spaceRepeat}${lineSpace}`, `${line}`.red);

		countTotal += count;
		if (!isNaN(line)) {
			lineTotal += line;
		}
	}

	console.log(`${sepRepeat}`);
	console.log(`${spaceRepeat}total${' '.repeat(itemSpace-'total'.length)}${spaceRepeat}`, `${countTotal} 个`.red, `${spaceRepeat}${' '.repeat(itemSpace - ('' + countTotal).length - 3)}`, `${lineTotal} 行`.red);
	console.log(`${sepRepeat}`);
}