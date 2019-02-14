/*\
title: $:/plugins/cleinias/TW5-SgfEditor/sgfEditor.js
type: application/javascript
module-type: widget

sgfEditor.js provides a <$sgfEditor [sgfFileName]> widget that loads the go game record contained in sgfFile or the sgfRecord in its text field into a Gui editor. 

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


//Real path to the external library is specified in files/tiddlywiki.files
var	Widget = require("$:/core/modules/widgets/widget.js").widget;
// var     tenukiPlayer = require("$:/plugins/cleinias/SgfEditor/tenuki").Game;
    var     besogoPlayer = require("$:/plugins/cleinias/SgfEditor/besogo").besogo;
    // var     besogoStylesheet = '$:/plugins/cleinias/SgfEditor/besogo.css';
// var    Sabaki = require("$:/plugins/cleinias/SgfEditor/sabaki").sabaki;
var GoGameWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
GoGameWidget.prototype = new Widget();
    
/*
Render this widget into the DOM
*/
GoGameWidget.prototype.render = function(parent,nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    var div = this.document.createElement("div");
    var parentWidth = this.parentDomNode.getBoundingClientRect().width;
    // var tenukiBoard = new  tenukiPlayer({element : div});
    div.setAttribute("class", "besogo-editor"); //General besogo editor 
    div.setAttribute("class", "besogo-container"); //General besogo editor 
    this.besogoPlayer = besogoPlayer;
    // Creating options for the full-blown editor with all panels
    var besogoOptions = {size:19,
                         panels : ['control', 'names', 'comment', 'tool', 'tree', 'file'],
                         realstones: true,
                         shadows: true,
                         coord:true,
                         parentWidth: parentWidth};
    // besogo.autoInit would also read the div attributes and transform them into
    // key/value pairs of the options obj. Skipping that for now.
    this.besogoPlayer.create(div);
    var twSgfFile = this.getAttribute("sgfFile");
    parent.insertBefore(div,nextSibling);
    this.domNodes.push(div);
};
  
/*
A widget with optimized performance will selectively refresh, but here we refresh always
*/
GoGameWidget.prototype.refresh = function(changedTiddlers) {
  // Regenerate and rerender the widget and
  // replace the existing DOM node
  this.refreshSelf();
  return true;
};


    exports.sgfEditor = GoGameWidget;

})();
