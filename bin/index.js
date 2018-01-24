#!/usr/bin/env node

if (parseFloat(process.versions.node) < 0.6) {
	return console.warn('node版本太低，请更新node版本至>=0.6.0!');
}

require('../lib/bin');