require('colors');

// output
module.exports = (arr, isBufType) => {
	// 输出表格的大小，只要修改spaceNum即可
	let spaceNum = 10;

	let fileType = 'FileType';
	let total = lineTotal;
	let countType = 'Unit (lines)';
	let tips = 'FileType Lines Count：';

	// 特殊文件不计算行数，计算个数，如图片，视频等等
	if (isBufType) {
		total = countTotal;
		countType = 'Unit (numbers)';
		tips = 'FileType Numbers Count：';
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