var defaultFunctions = {
	splitAt: (index, xs, length) => [xs.slice(0, index), xs.slice(index, index + length), xs.slice(index + length)]
} 

class Chapter {
	name = "";
	info = {
		location: "",
		time: ""
	};
	characters = {};
	dialogue = [];
	constructor (name, info) {
		this.name = name;
		this.info = info;
	}
}

class Character {
	id = "";
	name = [];
	constructor (id, name) {
		this.id = id;
		this.name = name.split(" ");
	}
}

class Dialogue {
	speaker;
	dialogue = [];
	constructor (speaker) {
		this.speaker = speaker;
	}
}

function DAUTokenizer(string) {
	var TokenizerCtx = {
		document: [],
		currentChapter: null,
		currentDialogueBlock: null
	};
	var temp = (string.includes("\r\n") ? string.split("\r\n") : string.split("\n"));
	var linearray = [];
	temp.forEach((v) => {
		if (/^\t*\S+/.test(v)) linearray.push(v.replace(/\s*$/, ""));
	});
	for (line of linearray) {
		if (/^\? /.test(line)) {
			var ine = line.replace(/^\? /, "").split(" :: ");
			if (ine[1]) {
				ine[1] = ine[1].split(" @ ");
				ine[1] = {location: ine[1][0], time: ine[1][1]};
			}
			TokenizerCtx.currentChapter = new Chapter(...ine);
			TokenizerCtx.document.push(TokenizerCtx.currentChapter);
		} else if (/^\- /.test(line)) {
			var ine = line.replace(/^\- /, "").split(" :: ");
			TokenizerCtx.currentChapter.characters[ine[0]] = new Character(...ine);
		} else if (/^(\t\t)|(    )/.test(line)){
			var ine = line.replace(/^(\t\t)|(    )/, "");
			var sliced = sliceDialogue(ine);
			TokenizerCtx.currentDialogueBlock.dialogue.push(sliced);

		} else if (/^(\t)|(  )/.test(line)){
			var ine = line.replace(/^(\t)|(  )/, "");
			TokenizerCtx.currentDialogueBlock = new Dialogue(ine);
			TokenizerCtx.currentChapter.dialogue.push(TokenizerCtx.currentDialogueBlock);
		}
	}
	return TokenizerCtx.document;
}

function sliceDialogue(obj) {
	var restOfArray = (Array.isArray(obj) ? obj.slice(0, -1) : []);
	var tester = (Array.isArray(obj) ? obj[obj.length - 1] : obj);
	var matches = tester.match(/(?:((?:<< )?"(?:\\"|[^"])*"(?: >>)?))/);
	if (matches == null) return obj;
	return sliceDialogue(
		[
			...(Array.isArray(restOfArray) ? restOfArray : [restOfArray]),
			...defaultFunctions.splitAt(matches.index, tester, matches[0].length)
		]
	).filter(x=>x!="");
}

exports.DAUTokenizer = DAUTokenizer;
exports.Chapter = Chapter;
exports.Character = Character;
exports.Dialogue = Dialogue;