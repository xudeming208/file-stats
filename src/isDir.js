const fs = require('fs');

// 判断是否文件夹
module.exports = path => {
	return fs.statSync(path).isDirectory();
}