'use strict';

/**
 * @file config
 * @author xudeming208@126.com
 */

module.exports = {
	// 描述：统计哪些文件夹
	// 类型：数组；
	// 例子：['./', '../test', '/Users/xudeming']
	// windows系统例子：['./', '../test', 'D:/file-status']
	// 备注：区分大小写，可以为相对目录和绝对目录
	path: ['./'],
	// 描述：在path文件夹中排除哪些文件夹
	// 类型：数组；
	// 例子：排除path文件夹下所有的test文件夹、上一级目录的a文件夹和带根目录的b文件夹 => ['test', '../a', '/Users/xudeming/Documents/xdm/file-stats/b']
	// windows系统例子：['test', '../a', 'D:/file-stats/b']
	// 备注：区分大小写；为空数组时，代表不排除任何文件夹；数组元素可以为文件夹名，也可以为相对目录文件夹名和绝对目录的文件夹名；强制不统计node_modules文件夹
	excludePath: [],
	// 描述：在path文件夹中排除哪些文件
	// 类型：数组；
	// 例子：排除path文件夹下所有的test.js文件、上一级目录的a.html和带根目录的b.css => ['test.js', '../a.html', '/Users/xudeming/Documents/xdm/file-stats/b.css']
	// windows系统例子：['test.js', '../a.html', 'D:/file-stats/b.css']
	// 备注：区分大小写；为空数组时，代表不排除任何文件；数组元素可以为文件名，也可以为相对目录文件名和绝对目录的文件名
	excludeFile: ['.DS_Store', '.localized', 'npm-debug.log'],
	// 描述：在path文件夹中统计哪些文件类型，包括其个数和行数的统计
	// 类型：数组；
	// 例子：['html', 'css', 'js']
	// 备注：不区分大小写；为空数组时，代表不统计任何文件；如果想统计所有类型，设置fileType: ['*']
	fileType: ['html', 'css', 'less', 'sass', 'js', 'jsx', 'ts', 'tsx', 'json', 'md', 'txt', 'py', 'class', 'java', 'jsp', 'php', 'node', 'jpeg', 'jpg', 'png', 'gif', 'mp3', 'mp4'],
	// 描述：fileType的子集，在fileType规定的文件类型中，哪些文件类型不统计行数(某些类型的文件统计其行数无意义)，只统计其个数
	// 类型：数组；
	// 例子：['jpg', 'mp4']
	// 备注：不区分大小写；为空数组时，代表fileType规定的类型都会统计行数，包括jpeg、png、mp4等
	countsOnly: ['jpeg', 'jpg', 'png', 'gif', 'mp3', 'mp4']
};