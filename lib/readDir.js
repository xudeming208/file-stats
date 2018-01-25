'use strict';

/**
 * @file readDir
 * @author xudeming208@126.com
 */

var fs = require('fs');
var isDir = require('./isDir');
var readFile = require('./readFile');

// 读取符合规则的文件夹
var readDir = function readDir(config) {
	var dir = config.dir;
	var files = fs.readdirSync(dir) || [];

	for (var i = 0, len = files.length; i < len; i++) {
		var item = files[i];
		var path = dir + item;

		// 排除node_modules文件夹
		if (/\/node_modules\//i.test(path + '/')) {
			continue;
		}

		// 排除文件夹
		if (config.excludeDir.test(path + '/')) {
			if (isDir(path)) {
				// 递归
				config.dir = path + '/';
				readDir(config);
			} else {
				// 当排除的文件夹很多文件时，为了不让用户以为卡死，在这里输出排除的文件
				console.log('No stat file\uFF1A'.white, '' + path);

				// 文件夹总共的文件数量
				allFiles++;
			}
			continue;
		}

		if (isDir(path)) {
			// 递归
			config.dir = path + '/';
			readDir(config);
		} else {
			// 文件夹总共的文件数量
			allFiles++;

			// 排除某些文件
			if (config.excludeFile.test(path)) {
				continue;
			}
			// 符合条件的
			if (config.fileType.test(path)) {
				readFile(item, path);
				// 文件夹符合筛选条件的文件数量
				matchFiles++;
			}
		}
	}
};

module.exports = readDir;