'use strict';

/**
 * @file index
 * @author xudeming208@126.com
 */

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');
const path = require('path');
const iswin = process.platform == 'win32';

const defaultConfig = require('./config');
const readDir = require('./readDir');
const output = require('./output');

// 文件夹总共的文件数量
global.allFiles = 0;
// 文件夹符合筛选条件的文件数量
global.matchFiles = 0;

// 文件统计数组
global.statsArr = [];

// 将数组转为正则
const arr2reg = (arr, key) => {
	let reg = '';
	if (!arr.length) {
		reg = /^$/;
		return reg;
	}

	reg = '/(\\.' + arr.join('\\b|\\.') + '\\b)$/i';

	if (key == 'excludePathReg') {
		reg = '/(\\/' + arr.join('\\/|\\/') + '\\/)/';
	}

	if (key == 'excludePathArr') {
		reg = '/(' + arr.join('\\/|') + '\\/)/';
	}

	if (key == 'fileType' && arr[0] == '*') {
		reg = '/.*/';
	}

	return eval(reg);
};

const init = config => {
	// 配置
	config = config ? (0, _assign2.default)(defaultConfig, config) : defaultConfig;

	let copy = JSON.parse((0, _stringify2.default)(config));

	// 处理excludePath，使其可以设置为路径名，也可以设置为相对路径和绝对路径，如：
	// h5
	// ./h5
	// ../mid/apps/h5
	// /Users/xudeming/Documents/xdm/mid/apps/h5
	config.excludePathArr = [];
	config.excludePathReg = [];
	config.excludePath.forEach((item, index) => {
		let obj = path.parse(item);
		// 带路径时
		if (obj.dir) {
			config.excludePathArr.push(path.resolve(item));
		}
		// 不带路径时
		else {
				config.excludePathReg.push(item);
			}
	});
	config.excludePathArr.forEach((item, index) => {
		if (iswin) {
			let arr = item.split('\\');
			let s = arr[0];
			let e = arr.slice(1);
			config.excludePathArr[index] = s + '\\\\' + e.join('\\/');
		} else {
			config.excludePathArr[index] = item.replace(/\//g, '\\/');
		}
	});
	// 处理excludePath结束


	// 将相关配置数组转为正则
	for (let key in config) {
		if (key == 'excludePathReg' || key == 'excludePathArr' || key == 'fileType' || key == 'countsOnly') {
			config[key] = arr2reg(config[key], key);
		}
	}

	// 处理excludeFile，使其可以设置为文件名，也可以设置路径文件名，如：
	// router.js
	// ./router.js
	// ../mid/server/router.js
	// /Users/xudeming/Documents/xdm/mid/server/router.js
	config.excludeFile.forEach((item, index) => {
		let obj = path.parse(item);
		// 带路径时
		if (obj.dir) {
			if (iswin) {
				item = path.resolve(item);
				let arr = item.split('\\');
				let s = arr[0];
				let e = arr.slice(1);
				config.excludeFile[index] = s + '\\' + e.join('/');
			} else {
				config.excludeFile[index] = path.resolve(item);
			}
		}
		// 不带路径时
		else {}
	});
	// 处理excludeFile结束


	// 特殊文件不统计
	global.countsOnly = config.countsOnly;

	// 循环读取path
	config.path.forEach(item => {
		try {
			config.resolvePath = path.resolve(item) + '/';

			// 文件夹符合帅选条件的文件数量
			readDir(config);
		} catch (err) {
			console.log(err);
		}
	});

	console.log(``);
	console.log(``);
	console.log(``);
	console.log(`此次统计的配置为：`.white);

	// console.dir(copy);
	console.log('{');
	for (let key in copy) {
		console.log('  ', key, ':', (0, _stringify2.default)(copy[key]) + ',');
	}
	console.log('}');

	console.log(``);
	console.log(``);
	console.log(`此文件夹中除了`, `node_modules`.red, `文件夹中总共有`, `${allFiles}`.red, `个文件，符合条件的有`, `${matchFiles}`.red, `个`);

	// 输出个数和行数
	output(statsArr);
	console.log(``);
};

module.exports = init;