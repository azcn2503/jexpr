var jexpr = require('./jexpr.js');

var command = [
	{
		"command": "open",
		"data": "http://store.apple.com/uk/browse/home/specialdeals/mac/macbook_pro"
	},
	{
		"command": "selectAll",
		"data": ".specs, span[itemprop=price]"
	},
	{
		"command": "getAttributeValues",
		"data": {
			"fromStep": 1,
			"fromIndex": 0,
			"attributeName": ["tagName", "innerText"],
			"group": true
		}
	},
	{
		"command": "save",
		"data": {
			"fromStep": 3,
			"fileName": "mbp"
		}
	},
	{
		"command": "done",
		"data": "mbp"
	}
];

var res = jexpr(command, [
	/[0-9]+/,
	/^da/,
	/Name$/,
	'*',
	/T/
]);
console.log(res); // [ 'innerText' ]