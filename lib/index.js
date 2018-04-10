'use strict';

/**
 * @file index
 * @author xudeming208@126.com
 */

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');
const path = require('path');

const defaultConfig = require('./config');
const readDir = require('./readDir');
const output = require('./output');

// 文件夹总共的文件数量
global.allFiles = 0;
// 文件夹符合筛选条件的文件数量
global.matchFiles = 0;

// 文件统计数组
global.statsArr = [];

const init = config => {
	// 配置
	config = config ? (0, _assign2.default)(defaultConfig, config) : defaultConfig;

	// 特殊文件不统计
	global.countsOnly = config.countsOnly;

	let copy = {};
	for (let key in config) {
		copy[key] = config[key];
	}
	// let copy = JSON.parse(JSON.stringify(config));

	// 转化为绝对路径
	config.dir = path.resolve(config.dir) + '/';

	// 文件夹符合帅选条件的文件数量
	readDir(config);

	console.log(``);
	console.log(``);
	console.log(``);
	console.log(`此次统计的配置为：`.white);
	console.log(`{
	dir: '${copy.dir}',
	excludeDir: ${copy.excludeDir},
	excludeFile: ${copy.excludeFile},
	fileType: ${copy.fileType},
	countsOnly: ${copy.countsOnly},
}`);
	console.log(``);
	console.log(``);
	console.log(`此文件夹中除了`, `node_modules`.red, `文件夹中总共有`, `${allFiles}`.red, `个文件，符合条件的有`, `${matchFiles}`.red, `个`);

	// 输出个数和行数
	output(statsArr);
	console.log(``);
};

module.exports = init;