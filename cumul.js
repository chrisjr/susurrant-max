var times = new Dict;
times.import_json("samples.json");

var current_cumul_probs = null;

function bang() {
	if (current_cumul_probs != null) {
		var token = choose_from_cumul(current_cumul_probs);
		output_time_for(token);
	}
}

function clear() {
	current_cumul_probs = null;
}

function probs() {
	var a = arrayfromargs(arguments);

	var token_probs = [];
	for (var i = 0; i < a.length / 2; i++) {
		token_probs.push([a[i*2], a[i*2+1]]);
	}
	current_cumul_probs = make_cumul(token_probs);
	post(current_cumul_probs);
}

function make_cumul(token_probs) {
	var sum = 0.0;
	return token_probs.map(function (token_prob) {
		sum += token_prob[1];
		return [token_prob[0], sum];
	});
}

function output_time_for(token) {
	outlet(0, token.toString());
		// var time = times.get(token);
		// outlet(0, time[0], time[1]);
}

function choose_from_cumul(cumul_probs) {
	var x = Math.random(),
		value = null;
	for (var i = 0; i < cumul_probs.length; i++) {
		if (x <= cumul_probs[i][1]) {
			value = cumul_probs[i][0];
			break;
		}
	}
 	return value;
}