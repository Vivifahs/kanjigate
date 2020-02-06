const wanakana = require('wanakana');
const Kuroshiro = require('kuroshiro');
const kuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

exports.type = async function(Test) {
	const kuroshiro = new Kuroshiro();

	await kuroshiro.init(new kuromojiAnalyzer());

	async function catagorize(verb) {
		let kana = await kuroshiro.convert(verb);
		let romaji = wanakana.toRomaji(kana);
		if (verb === "来る")
			return "Kuru";
		if (verb === "する")
			return "Suru";
		if (isException(romaji))
			return "Godan";
		if (romaji.endsWith("iru") || romaji.endsWith("eru"))
			return "Ichidan";
		else
			return "Godan";
	}

	function isException(verb) {
		 let exceptions = ['aseru', 'azakeru', 'daberu', 'eru', 'fukeru', 'fuseru', 'haberu', 'heru', 'hineru', 'hirugaeru', 'hoteru', 'kaeru', 'kageru', 'kakeru', 'keru', 'kuneru', 'kutugaeru', 'meru', 'neru', 'nomeru', 'numeru', 'omoneru', 'seru', 'seseru', 'shaberu', 'shigeru', 'shikeru', 'shimeru', 'soberu', 'suberu', 'takeru', 'teru', 'tsuneru', 'uneru', 'useru', 'yomigaeru', 'aburagiru', 'bibiru', 'chigiru', 'chiru', 'dojiru', 'guchiru', 'hairu', 'hashiru', 'hiru', 'hojiru', 'hotobashiru', 'ibiru', 'ijiru', 'ikiru', 'iru', 'kagiru', 'kajiru', 'kiru', 'kishiru', 'kojiru', 'kubiru', 'kujiru', 'mairu', 'majiru', 'meiru', 'mikubiru', 'minagiru', 'mogiru', 'mojiru', 'mushiru', 'najiru', 'nejiru', 'nigiru', 'nijiru', 'nonoshiru', 'ochiiru', 'omoiiru', 'omoikiru', 'sebiru', 'shiru', 'soshiru', 'sujiru', 'tagiru', 'tamagiru', 'tobashiru', 'tochiru', 'yajiru', 'yogiru', 'yojiru', 'yokogiru'];
		 return (exceptions.includes(verb))
	}

	let result;
	result = await catagorize(Test);
	return result;
}

exports.conjugate = function(Verb, Type) {
	let modif = wanakana.toRomaji(Verb);
	switch(Type) {
		case "Ichidan":
			stem = modif.slice(0, -2);
			this.casual = Verb;
			this.formal = wanakana.toKana(stem + "masu");
			this.casualPast = wanakana.toKana(stem + "ta");
			this.formalPast = wanakana.toKana(stem + "mashita");
			this.casualInv = wanakana.toKana(stem + "nai");
			this.formalInv = wanakana.toKana(stem + "masen");
			this.casualPastInv = wanakana.toKana(stem + "nakatta");
			this.formalPastInv = wanakana.toKana(stem + "masendeshita");

			this.list = function () {
				console.log(this.casual);
				console.log(this.formal);
				console.log(this.casualPast);
				console.log(this.formalPast);
				console.log(this.casualInv);
				console.log(this.formalInv);
				console.log(this.casualPastInv);
				console.log(this.formalPastInv);
			}
			break;
	}
}