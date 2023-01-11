var { Chapter, Character, Dialogue } = require("./parser.js");
class Export {
  folder;
  extension;
  data = [];
	constructor (folder, extension) {
		this.folder = folder;
    this.extension = extension;
	}
}

var currentExport;
var narrator = new Character("%", "Narrator");
var DAUConverters = {
  Markdown (js) {
    currentExport = new Export("markdown", ".md");
    js.forEach((chapter, i) => {
      currentExport.data[i] = {
        data: "",
        name: chapter.name
      };
      currentExport.data[i].data += `# ${chapter.name}\n`;
      if (chapter.info) {
        if (chapter.info.location) currentExport.data[i].data += `> ${chapter.info.location}`;
        if (!(chapter.info.location || chapter.info.time)) currentExport.data[i].data += `\n`;
        if (chapter.info.location && chapter.info.time) currentExport.data[i].data += ` - `;
        if (!chapter.info.location) currentExport.data[i].data += `> `;
        if (chapter.info.time) currentExport.data[i].data += `${chapter.info.time}`;
      }
      currentExport.data[i].data += `\n\n`;
      currentExport.data[i].data += `Characters:\n`;
      Object.entries(chapter.characters).forEach(([_, character]) => {
        currentExport.data[i].data += `- ${character.name.join(" ")}\n`;
      });
      currentExport.data[i].data += `\n`;
      chapter.characters["%"] = narrator;
      chapter.dialogue.forEach((dialogue) => {
        currentExport.data[i].data += `## ${chapter.characters[dialogue.speaker].name.join(" ")}\n`;
        dialogue.dialogue.forEach((text) => {
          var plctext;
          if (Array.isArray(text))
            plctext = text.map(
              x => (
                x.endsWith("\" >>") || (
                  x.startsWith("\"") && 
                  x.endsWith("\"")
                ) || 
                x.startsWith("<< \"")
              ) ? 
              "**" + x + "**" : 
              x
            ).join("") + "\n\n";
          else plctext = text + "\n\n";
          currentExport.data[i].data += plctext.replace(/(:\/)|(\/:)/gi, "*");
        });
      });
    });

    return currentExport;
  }
}

exports.DAUConverters = DAUConverters;