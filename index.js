var options = require('optimist')
	.usage('Usage: $0 -m [message] -s [symbol] -v [vertical] -w [whitespace size]')
	.default({ s: ':coffeeparrot:', v: false, w: 6 /* slack for emojii */ })
	.alias('s', 'symbol')
	.alias('m', 'message')
	.alias('v', 'vertical')
	.alias('w', 'whitespaceWidth')
	.alias('h', 'help')
	.demand('m')
var argv = options.argv;
var letters = require('./letters.js');

if(argv.h) {
	console.error(options.help());
	return;
}

var symbol = argv.s;
var string = argv.m;
var horizontal = !argv.v;
var character_width = 6;
var character_height = 6;
var whitespaceSize = argv.w;
var whitespace = rightPad('', whitespaceSize, '_');

if(!horizontal) {
	console.log('.');
	string.toLowerCase().split('').forEach(function(char) {
		if(letters[char]) {
			process.stdout.write( letters[char].replace(/a/g, symbol).replace(/ /g, whitespace));
		} else {
			process.stdout.write( letters.unknown.replace(/a/g, symbol).replace(/ /g, whitespace));
		}
	});
} else {
	console.log('.');
	var chars = string.toLowerCase().split('')
	for(var i = 0; i < character_height; i++) {
		chars.forEach(function(char) {
			if(letters[char]) {
				process.stdout.write(
					rightPad( letters[char].split('\n')[i], character_width)
						.replace(/a/g, symbol)
						.replace(/\s/g, whitespace)
				);
			} else {
				//process.stdout.write(
					rightPad( letters.unknown.split('\n')[i], character_width )
						.replace(/a/g, symbol)
						.replace(/\s/g, whitespace)
				//);
			}
		});
		console.log('');
	}
}

function rightPad(str, num) {
	while (str.length < num) {
		str += ' ';
	}
	return str;
}