'use strict';

/**
 * @file readDir
 * @author xudeming208@126.com
 */

const fs = require('fs');
const path = require('path');
const isDir = require('./isDir');
const readFile = require('./readFile');

// 读取符合规则的文件夹
const readDir = config => {
	let resolvePath = config.resolvePath;
	let files = fs.readdirSync(resolvePath) || [];

	for (let i = 0, len = files.length; i < len; i++) {
		let item = files[i];
		let filepath = resolvePath + item;

		// 排除node_modules文件夹
		if (/\/node_modules\//i.test(filepath + '/')) {
			continue;
		}

		// 排除文件夹。可以设置为路径名，也可以设置为相对路径和绝对路径，如：
		// h5
		// ./h5
		// ../mid/apps/h5
		// /Users/xudeming/Documents/xdm/mid/apps/h5
		if (config.excludePathReg.test(filepath + '/') || config.excludePathArr.test(filepath + '/')) {
			if (isDir(filepath)) {
				// 递归
				config.resolvePath = filepath + '/';
				readDir(config);
			} else {
				// output files
				console.log(`file：`.white, `${filepath}`);

				// 文件夹总共的文件数量
				allFiles++;
			}
			continue;
		}

		if (isDir(filepath)) {
			// 递归
			config.resolvePath = filepath + '/';
			readDir(config);
		} else {
			// 文件夹总共的文件数量
			allFiles++;

			// 排除某些文件。excludeFile可以设置为文件名，也可以设置路径文件名,如：
			// router.js
			// ./router.js
			// ../mid/server/router.js
			// /Users/xudeming/Documents/xdm/mid/server/router.js
			if (config.excludeFile.includes(path.basename(filepath)) || config.excludeFile.includes(filepath)) {
				// output files
				console.log(`file：`.white, `${filepath}`);

				continue;
			}
			// 符合条件的
			if (config.fileType.test(filepath)) {
				readFile(item, filepath);
				// 文件夹符合筛选条件的文件数量
				matchFiles++;
			} else {
				// output files
				console.log(`file：`.white, `${filepath}`);
			}
		}
	}
};

module.exports = readDir;