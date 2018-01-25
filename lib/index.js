'use strict';

/**
 * @file index
 * @author xudeming208@126.com
 */

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('colors');
var path = require('path');

var defaultConfig = require('./config');
var readDir = require('./readDir');
var output = require('./output');

// 文件夹总共的文件数量
global.allFiles = 0;
// 文件夹符合筛选条件的文件数量
global.matchFiles = 0;

// 文件个数数组
global.countArr = [];
// 总文件个数
global.countTotal = 0;

// 文件行数数组
global.lineArr = [];
// 总文件行数
global.lineTotal = 0;

var init = function init(config) {
	// 配置
	config = config ? (0, _assign2.default)(defaultConfig, config) : defaultConfig;

	var copy = {};
	for (var key in config) {
		copy[key] = config[key];
	}
	// let copy = JSON.parse(JSON.stringify(config));

	// 转化为绝对路径
	config.dir = path.resolve(config.dir) + '/';

	// 文件夹符合帅选条件的文件数量
	readDir(config);

	console.log('');
	console.log('');
	console.log('');
	console.log('\u6B64\u6B21\u7EDF\u8BA1\u7684\u914D\u7F6E\u4E3A\uFF1A'.white);
	console.log('{\n\tdir: ' + copy.dir + ',\n\texcludeDir: ' + copy.excludeDir + ',\n\texcludeFile: ' + copy.excludeFile + ',\n\tfileType: ' + copy.fileType + ',\n}');
	console.log('');
	console.log('');
	console.log('\u6B64\u6587\u4EF6\u5939\u4E2D\u9664\u4E86', 'node_modules'.white, '\u6587\u4EF6\u5939\u4E2D\u603B\u5171\u6709', ('' + allFiles).red, '\u4E2A\u6587\u4EF6\uFF0C\u7B26\u5408\u6761\u4EF6\u7684\u6709', ('' + matchFiles).red, '\u4E2A');

	// 输出个数和行数
	output(countArr, true);
	output(lineArr, false);
	console.log('');
};

module.exports = init;