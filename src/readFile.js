require('colors');
const fs = require('fs');
const bufType = require('./bufType');

// 写入数组
const inputArr = (arr, type, num) => {
	if (!arr.includes(type)) {
		arr.push(type);
		arr.push(num);
	} else {
		// 如果之前已经统计了此类型，则直接将其line相加
		let index = arr.indexOf(type);
		arr[index + 1] += num;
	}
}

// 读取单个文件行数
module.exports = (item, file) => {
	// 取得文件类型
	let match = file.match(/(\.[^.\/]*)$/ig);

	let type = '';
	if (!match) {
		// 不知道类型的，显示/最后的字符
		type = '/' + file.split('/').pop();
	} else {
		type = item.startsWith('.') ? match[0] : '*' + match[0];
	}

	let unit = '个'
	let num = 1;

	// 统计各种类型文件的个数
	inputArr(countArr, type, num);

	// 统计各种类型文件的行数；特殊文件不计算行数，如图片，视频等等，只计算个数
	if (!bufType.includes(type)) {
		unit = '行';
		let content = fs.readFileSync(file, 'utf-8');
		// 获取行数
		num = content.split('\n').length;
		inputArr(lineArr, type, num);
	}

	// output files
	console.log(`file：`.white, `${file}  `, `${num}`.red, `${unit}`.red);
}