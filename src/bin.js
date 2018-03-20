'use strict';

/**
 * @file bin
 * @author xudeming208@126.com
 */

const Commander = require('commander');
const pkg = require('../package.json');
const init = require('./index');
let defaultConfig = require('./config');
let stat = true;


// Commander
Commander.usage('[options] <arguments>');

Commander.on('--help', function() {
	console.log(``);
	console.log(``);
	console.log(`  Home: https://github.com/xudeming208/file-stats\n`);
	console.log(`  Doc: https://github.com/xudeming208/file-stats/blob/master/README.md\n`);
	console.log(`  Examples1: file-stats -u\n`);
	console.log(`  Examples2: file-stats -d './' -e '/\\/view\\//i' -x '/(\\bbanner\\.html\\b)$/i' -f '/(\\.html\\b)$/i'\n -o '/(\\.mp4\\b)$/i'\n`);
	console.log(`  Examples3: file-stats -c './myConfig.js'\n`);
});

// options
Commander
	// version
	.option('-v, -V, --version', 'output the version number', () => {
		stat = false;
		console.log(`\nversion: ${pkg.version}\n`);
		console.log(`Home: https://github.com/xudeming208/file-stats\n`)
	})
	// use default config
	.option('-u, --default', 'Use the default configuration.', () => {

	})
	// dir
	.option('-d, --dir <dir>', 'Configure the statistics folder by String.', dir => {
		defaultConfig.dir = dir;
	})
	// excludeDir
	.option('-e, --exclude-dir <excludeDir>', 'configure the excluded folders by Regex.', excludeDir => {
		defaultConfig.excludeDir = eval(excludeDir);
	})
	// excludeFile
	.option('-x, --exclude-file <excludeFile>', 'configure the excluded files by Regex.', excludeFile => {
		defaultConfig.excludeFile = eval(excludeFile);
	})
	// fileType
	.option('-f, --file-type <fileType>', 'configure the file type by Regex.', fileType => {
		defaultConfig.fileType = eval(fileType);
	})
	// countsOnly
	.option('-o, --counts-only <countsOnly>', 'Configure the file type that only counts the number of files by Regex.', countsOnly => {
		defaultConfig.countsOnly = eval(countsOnly);
	})
	// config
	.option('-c, --config <config>', 'Use other configuration files. The configuration file must return an object.', config => {
		let yoursConfig = require(config);
		// defaultConfig = yoursConfig ? Object.assign(defaultConfig, yoursConfig) : defaultConfig;
		defaultConfig = Object.assign(defaultConfig, yoursConfig);
	});

// init
process.nextTick(() => {
	stat && init(defaultConfig);
});


Commander.parse(process.argv);

// 没有参数的情况，显示help
if (!process.argv.slice(2).length) {
	Commander.help();
}