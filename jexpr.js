let jexpr = (input = {}, expr = [], filter = null) => {

	let res = [];

	if (!expr || expr.length == 0) { return res; }

	for (let i in expr) {
		if (typeof(expr[i]) === 'number') { continue; }
		// Match against a regex looking string
		let re = expr[i].match(/^\/(.+?)\/([igm]*)$/);
		if (!re) { continue; }
		// Convert the string to an actual regex with the proper flags (if any)
		expr[i] = new RegExp(re[1], re[2]);
	}

	let walk = (obj, step = 0) => {

		let isValue = () => { return step == expr.length - 1; }
		let add = (data) => {
			if (step == expr.length - 1) { res.push(data); return true; }
			return false;
		};

		// If the expression step is a regular expression
		if (typeof(expr[step]) === 'object') {

			// If the expression step is a value and the object tests true against the current expression, add the values if any
			if (isValue()) {
				if (expr[step].test(obj)) {
					add(obj);
				}
			}

			// If obj is an object, iterate over it and test that any of its keys test true against the expression, if they do then add their values if any and walk it
			if (typeof(obj) === 'object') {
				for (let i in obj) {
					if (expr[step].test(i)) {
						add(obj[i]);
						walk(obj[i], step + 1);
					}
				}
			}

		}

		// If the expression step is not a regular expression
		else {

			// If "*" was passed and obj is an object, iterate over it, add the values if any, and walk it
			if(expr[step] == '*' && typeof(obj) === 'object') {
				for (let i in obj) {
					add(obj[i]);
					walk(obj[i], step + 1);
				}
			}

			// If the expression step is a value and it represents an existing property in the object, add the values if any, and walk it
			if (isValue()) {
				if (obj.hasOwnProperty(expr[step])) {
					add(obj[expr[step]]);
					walk(obj[expr[step]], step + 1);
				}
			}

		}

	};

	walk(input);

	if (filter != null && !isNaN(filter)) {
		res = res[filter];
	}

	return res;

};

if (module && module.exports) {
	module.exports = jexpr;
}