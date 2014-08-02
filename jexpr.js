function jexpr(input, expr) {

	var res = [];

	if(!expr || expr.length == 0) { return res; }

	for(var i in expr) {
		var re = expr[i].match(/^\/(.+?)\/([igm]*)$/);
		if(!re) { continue; }
		expr[i] = new RegExp(re[1], re[2]);
	}

	function walk(obj, step) {

		function addToRes(data) {

			if(step == expr.length - 1) { res.push(data); }

		}

		var step = step || 0;

		val = step == expr.length - 1 ? true : false;

		if(typeof(expr[step]) === 'object') {
			// regular expression
			if(val) {
				// match on values
				if(expr[step].test(obj)) {
					addToRes(obj);
					walk(obj[i], step + 1);
				}
			}
			else {
				// match on keys
				for(var i in obj) {
					if(expr[step].test(i)) {
						addToRes(obj[i]);
						walk(obj[i], step + 1);
					}
				}
			}
		}

		if(typeof(expr[step]) === 'string' || typeof(expr[step]) === 'number') {

			if(expr[step] == '*' && typeof(obj) === 'object') {
				// iterate this level
				for(var i in obj) {
					addToRes(obj[i]);
					walk(obj[i], step + 1);
				}
			}

			if(val) {

				if(obj[expr[step]]) {
					addToRes(obj[expr[step]]);
					walk(obj[expr[step]], step + 1);
				}

			}

		}

	}

	walk(input);

	return res;

}

if(module && module.exports) {
	module.exports = jexpr;
}