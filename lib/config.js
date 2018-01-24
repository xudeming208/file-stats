'use strict';

/**
 * @file config
 * @author xudeming208@126.com
 */

module.exports = {
	// 统计哪个文件夹；默认为当前文件夹
	dir: "./",
	// 哪种文件夹中的文件不统计，规则为正则表达式；默认为node_modules
	// 如果不想排除，设置excludeDir: /^$/i
	excludeDir: /(\/node_modules\/)/i,
	// 哪些文件不统计，规则为正则表达式；默认为.DS_Store、.localized
	// 如果不想排除，设置excludeFile: /^$/i
	excludeFile: /(\.DS_Store\b|\.localized\b)$/i,
	// 统计哪种类型的文件，规则为正则表达式；默认包括html,css,less,sass,js,ts,json,md,jpeg,jpg,png,gif
	// 如果想统计所有类型，设置fileType:/.*/
	fileType: /(\.html\b|\.css\b|\.less\b|\.sass\b|\.js\b|\.ts\b|\.json\b|\.md\b|\.jpeg\b|\.jpg\b|\.png\b|\.gif\b)$/i
};