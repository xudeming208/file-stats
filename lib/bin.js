'use strict';

/**
 * @file bin
 * @author xudeming208@126.com
 */

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');
const Commander = require('commander');
const pkg = require('../package.json');
const init = require('./index');
let defaultConfig = require('./config');
let commandArr = [];
let stat = true;

// Commander
Commander.usage('[options] <arguments>');

Commander.on('--help', function () {
	console.log(``);
	console.log(``);
	console.log(`  Home: https://github.com/xudeming208/file-stats\n`);
	console.log(`  Doc: https://github.com/xudeming208/file-stats/blob/master/README.md\n`);
	console.log(`  demo1: file-stats -d\n`);
	console.log(`  demo2: fst -d\n`);
	console.log(`  demo3: file-stats -p "['./']" -e "['view', 'test']" -x "['index.html', 'index.js']" -f "['html', 'js', 'css', 'jpg']" -o "['jpg']"\n`);
	console.log(`  demo4: file-stats -c './myConfig.js'\n`);
});

// options
Commander
// version
.option('-v, --version', '查看版本号', () => {
	stat = false;
	console.log(`\nversion: ${pkg.version}\n`);
	console.log(`Home: https://github.com/xudeming208/file-stats\n`);
})
// use default config
.option('-d, --default', '用默认的配置统计', () => {})
// path
.option('-p, --path <path>', '[数组]统计哪些文件夹？', path => {
	defaultConfig.path = eval(path);
})
// excludePath
.option('-e, --exclude-path <excludePath>', '[数组]在path文件夹中排除哪些文件夹？', excludePath => {
	defaultConfig.excludePath = eval(excludePath);
})
// excludeFile
.option('-x, --exclude-file <excludeFile>', '[数组]在path文件夹中排除哪些文件？', excludeFile => {
	defaultConfig.excludeFile = eval(excludeFile);
})
// fileType
.option('-f, --file-type <fileType>', '[数组]在path文件夹中统计哪些文件类型？包括其个数和行数的统计', fileType => {
	defaultConfig.fileType = eval(fileType);
})
// countsOnly
.option('-o, --counts-only <countsOnly>', '[数组]fileType的子集。在fileType规定的文件类型中，哪些文件类型不统计行数(比如图片、视频等)，只统计其个数', countsOnly => {
	defaultConfig.countsOnly = eval(countsOnly);
})
// config
.option('-c, --config <config>', '[须返回对象]用自定义的配置文件统计。配置文件必须返回一个对象，参考README.md', config => {
	let yoursConfig = require(path.resolve(config));
	defaultConfig = (0, _assign2.default)(defaultConfig, yoursConfig);
});

commandArr = ['-v', '-V', '--version', '-d', '--default', '-p', '--path', '-e', '--exclude-path', '-x', '--exclude-file', '-f', '--file-type', '-o', '--counts-only', '-c', '--config'];

// init
process.nextTick(() => {
	stat && init(defaultConfig);
});

Commander.parse(process.argv);

// 没有参数或者参数不对的情况，显示help
if (!process.argv.slice(2).length || !commandArr.includes(process.argv.slice(2, 3).join())) {
	Commander.help();
}