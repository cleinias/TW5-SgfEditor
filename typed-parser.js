/*\
title: $:/plugins/cleinias/sgfeditor/typed-parser.js
type: application/javascript
module-type: parser

This parser wraps sgf go game records into an sgfeditor

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var SGFParser = function(type,text,options) {
	var element = {
			type: "sgfeditor",
			tag: "$sgfeditor",
			text: text
		};
	this.tree = [element];
console.log(text);
};

exports["application/x-go-sgf"] = SGFParser;

})();
