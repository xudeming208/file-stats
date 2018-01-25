'use strict';

/**
 * @file isDir
 * @author xudeming208@126.com
 */

var fs = require('fs');

// 判断是否文件夹
module.exports = function (path) {
	try {
		return fs.statSync(path).isDirectory();
	} catch (e) {
		return false;
	}
};