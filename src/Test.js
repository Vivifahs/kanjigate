var verb = require('./verb.js');

async function test() {
	let results = await verb.type(randomItem);
	console.log(results);
}

let dictVerbs = ['会う', '開く', '開ける', 'あげる'];

var randomItem = dictVerbs[Math.floor(Math.random()*dictVerbs.length)];
//console.log(randomItem);
//test();

var tabe;
tabe = new verb.conjugate("食べる", "Ichidan");
tabe.list()
tabe = new verb.conjugate("見る", "Ichidan");
tabe.list()