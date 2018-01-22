require('colors');
const path = require('path');

const defaultConfig = require('./config');
const readDir = require('./readDir');
const output = require('./output');


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


const init = config => {
	// 配置
	config = config ? Object.assign(defaultConfig, config) : defaultConfig;

	// 转化为绝对路径
	config.dir = path.resolve(config.dir) + '/';

	// 文件夹符合帅选条件的文件数量
	readDir(config);

	console.log(``);
	console.log(``);
	console.log(``);
	console.log(`此文件夹下总共有`, `${allFiles}`.red, `个文件，符合条件的有`, `${matchFiles}`.red, `个`);

	// 输出个数和行数
	output(countArr, true);
	output(lineArr, false);
}


module.exports = init;