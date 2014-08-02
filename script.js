function jexpr(input, expr) {

	var res = [];

	if(!expr || expr.length == 0) { return res; }

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

		if(typeof(expr[step]) === 'string') {

			if(expr[step] == '*') {
				// iterate this level
				for(var i in obj) {
					addToRes(obj[i]);
					walk(obj[i], step + 1);
				}
			}

			else if(/[0-9]+-[0-9]+/.test(expr[step])) {
				var range = expr[step].split('-');
				for(var i = range[0]; i <= range[1]; i++) {
					addToRes(obj[i]);
					walk(obj[i], step + 1);
				}
			}

		}

		if(typeof(expr[step]) === 'number' || typeof(expr[step]) === 'string') {

			if(obj[expr[step]]) {
				addToRes(obj[expr[step]]);
				walk(obj[expr[step]], step + 1);
			}

		}

	}

	walk(input);

	return res;

}