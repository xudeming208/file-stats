'use strict';

/**
 * @file config
 * @author xudeming208@126.com
 */

module.exports = {
	// 描述：统计哪个文件夹
	// 类型：字符串；区分大小写，可以为相对目录和绝对目录
	// 例子：['./', '../test', '/root']
	dir: './',
	// 描述：在dir文件夹中排除哪些文件夹
	// 类型：正则；区分大小写
	// 例子：排除test文件夹 => /\/test\//
	// 备注：强制不统计node_modules文件夹
	excludeDir: /^$/,
	// 描述：在dir文件夹中排除哪些文件
	// 类型：正则；区分大小写
	// 例子：排除test.js文件 => /\btest.js\b/
	// 备注：如果不想排除，设置excludeFile: /^$/
	excludeFile: /(\.DS_Store\b|\.localized\b)$/,
	// 描述：在dir文件夹中统计哪些类型，包括其个数和行数的统计
	// 类型：正则；不区分大小写
	// 默认值：html,css,less,sass,js,ts,json,md,jpeg,jpg,png,gif
	// 备注：如果想统计所有类型，设置fileType:/.*/
	fileType: /(\.html\b|\.css\b|\.less\b|\.sass\b|\.js\b|\.ts\b|\.json\b|\.md\b|\.jpeg\b|\.jpg\b|\.png\b|\.gif\b)$/i,
	// 描述：fileType的子集，在fileType规定的文件类型中，哪些类型不统计行数(某些类型的文件统计其行数无意义)，只统计其个数
	// 类型：正则；不区分大小写
	// 默认值：jpeg, jpg, png, gif
	// 备注：如果设置countsOnly:/^$/，则fileType规定的类型都会统计行数，包括jpeg、png等
	countsOnly: /(\.jpeg\b|\.jpg\b|\.png\b|\.gif\b)$/i
};