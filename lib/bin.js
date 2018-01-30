'use strict';

/**
 * @file bin
 * @author xudeming208@126.com
 */

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Commander = require('commander');
var pkg = require('../package.json');
var init = require('./index');
var defaultConfig = require('./config');
var stat = true;

// Commander
Commander.usage('[options] <arguments>');

Commander.on('--help', function () {
	console.log('');
	console.log('');
	console.log('  Home: https://github.com/xudeming208/file-stats\n');
	console.log('  More: https://github.com/xudeming208/file-stats/blob/master/README.md\n');
	console.log('  Examples1: file-stats -u\n');
	console.log('  Examples2: file-stats -d \'./\' -e \'/\\/view\\//i\' -x \'/(\\bbanner\\.html\\b)$/i\' -f \'/(\\.html\\b)$/i\'\n');
	console.log('  Examples3: file-stats -c \'./myConfig.js\'\n');
});

// options
Commander
// version
.option('-v, -V, --version', 'output the version number', function () {
	stat = false;
	console.log('\nversion: ' + pkg.version + '\n');
	console.log('Home: https://github.com/xudeming208/file-stats\n');
})
// use default config
.option('-u, --default', 'Use the default config.', function () {})
// dir
.option('-d, --dir <dir>', 'Set the statistics folder.', function (dir) {
	defaultConfig.dir = dir;
})
// excludeDir
.option('-e, --exclude-dir <excludeDir>', 'Exclude folder by regex. The default is: "/(\/node_modules\/)/i".', function (excludeDir) {
	defaultConfig.excludeDir = eval(excludeDir);
})
// excludeFile
.option('-x, --exclude-file <excludeFile>', 'Exclude file by regex. The default is: "/(\.DS_Store\\b|\.localized\\b)$/i".', function (excludeFile) {
	defaultConfig.excludeFile = eval(excludeFile);
})
// fileType
.option('-f, --file-type <fileType>', 'statistics fileType regex. The default is: "/(\.html\\b|\.css\\b|\.less\\b|\.sass\\b|\.js\\b|\.ts\\b|\.json\\b|\.jpeg\\b|\.jpg\\b|\.png\\b|\.gif\\b)$/i".', function (fileType) {
	defaultConfig.fileType = eval(fileType);
})
// config
.option('-c, --config <config>', 'Use yours config.js, The config.js must be return an object.', function (config) {
	var yoursConfig = require(config);
	defaultConfig = yoursConfig ? (0, _assign2.default)(defaultConfig, yoursConfig) : defaultConfig;
});

// init
process.nextTick(function () {
	stat && init(defaultConfig);
});

Commander.parse(process.argv);

// 没有参数的情况，显示help
if (!process.argv.slice(2).length) {
	Commander.help();
}