const wanakana = require('wanakana');
const Kuroshiro = require('kuroshiro');
const kuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const main = async () => {
	const kuroshiro = new Kuroshiro();

	await kuroshiro.init(new kuromojiAnalyzer());

	async function verbType(verb) {
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
	result = await verbType('来る');
	console.log(result);
	result = await verbType('分かる');
	console.log(result);
	result = await verbType('食べる');
	console.log(result);
	
}
main();
