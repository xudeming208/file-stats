#!/usr/bin/env node

if (parseFloat(process.versions.node) < 6.0) {
	return console.warn('node版本太低，请更新node版本至>=6.0.0!');
}

require('../lib/bin');