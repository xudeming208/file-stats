'use strict';

/**
 * @file config
 * @author xudeming208@126.com
 */

module.exports = {
	// 统计哪个文件夹；默认为当前文件夹
	dir: "./",
	// 哪种文件夹中的文件不统计，规则为正则表达式；默认都统计（除了node_modules文件夹）
	// 由于node_modules文件夹很大且统计其无实际意义，所以程序强制不会统计node_modules文件夹，其中的文件数也不会计算到总共的文件个数中
	// 如果要排除test文件夹，可以设置为：excludeDir: /\/test\//
	excludeDir: /^$/,
	// 哪些文件不统计，规则为正则表达式；默认为.DS_Store、.localized
	// 如果不想排除，设置excludeFile: /^$/i
	excludeFile: /(\.DS_Store\b|\.localized\b)$/,
	// 统计哪种类型的文件，规则为正则表达式；默认包括html,css,less,sass,js,ts,json,md,jpeg,jpg,png,gif
	// 如果想统计所有类型，设置fileType:/.*/
	fileType: /(\.html\b|\.css\b|\.less\b|\.sass\b|\.js\b|\.ts\b|\.json\b|\.md\b|\.jpeg\b|\.jpg\b|\.png\b|\.gif\b)$/i
}