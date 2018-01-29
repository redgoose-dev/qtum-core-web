const rl = require('readline');


module.exports = function ask(question, callback) {
	const r = rl.createInterface({
		input: process.stdin,
		output: process.stdout});
	r.question(question, function(answer) {
		r.close();
		callback(answer);
	});
};