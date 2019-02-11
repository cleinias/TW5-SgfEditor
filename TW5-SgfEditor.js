/*\
title: $:/plugins/cleinias/TW5-WGo/WGo.js
type: application/javascript
module-type: widget

WGo.js provides a <$gogame sgfFile=''> widget that loads the go game record 
contained in sgfFile into the player provided by the WGo.js library. 
See https://github.com/waltheri/wgo.js for details on the latter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";


//Real path to the external library is specified in files/tiddlywiki.files
var	Widget = require("$:/core/modules/widgets/widget.js").widget;
var     WGoPlayer = require("$:/plugins/cleinias/WGo/WgoPlayer.js").BasicPlayer;
    
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
    var twSgfFile = this.getAttribute("sgfFile");
    var div = this.document.createElement("div");
    var player = new WGo.BasicPlayer(div,{sgfFile: twSgfFile});
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


    exports.gogame = GoGameWidget;

})();
