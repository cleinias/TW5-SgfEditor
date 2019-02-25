/*\
title: $:/plugins/cleinias/sgfeditor/sgfeditor.js
type: application/javascript
module-type: widget

sgfeditor.js provides a <$sgfeditor [sgfFileName]> widget that loads the go game record contained in sgfFile or the sgfRecord in its text field into a Gui editor. 

\*/
(function(){

    /*jslint node: true, browser: true */
    /*global $tw: false */
    "use strict";


    //Real path to the external library is specified in files/tiddlywiki.files
    var	Widget = require("$:/core/modules/widgets/widget.js").widget;
    var besogoPlayer = require("$:/plugins/cleinias/sgfeditor/besogo").besogo;
    var GoGameWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
GoGameWidget.prototype = new Widget();


// Options can be set in the config panel, which holds JSON data    
var SGFEDITOR_OPTIONS = "$:/plugins/cleinias/sgfeditor/config";
/*
Render this widget into the DOM
*/
GoGameWidget.prototype.render = function(parent,nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    var div = this.document.createElement("div");
    var parentWidth = this.parentDomNode.getBoundingClientRect().width;
    try {
        div.setAttribute("class", "besogo-editor"); //General besogo editor 
        div.setAttribute("class", "besogo-container"); //General besogo editor 
        // Initialise options from the config tiddler or from the tiddler attributes
        var config = $tw.wiki.getTiddlerData(SGFEDITOR_OPTIONS,{});
        // Read options from config panel, but tiddler's fields can override. If noone are present provide defaults
        var options = {
            size       : this.getAttribute("size", config.size || 19),
            panels     : this.getAttribute("panels", config.panels || ['control', 'names', 'comment', 'tool', 'tree', 'file']),
            realstones : this.getAttribute("realstones", config.realstones || false),
            shadows    : this.getAttribute("shadows", config.shadows || true),
            coord      : this.getAttribute("coord", config.coord || true),
            parentWidth: parentWidth,
            maxWidth   : this.getAttribute("maxWidth", config.maxWidth || 900),
            tool       : this.getAttribute("tool", config.tool || ''),
            variants   : this.getAttribute("variants", config.variants || 1),
            path       : this.getAttribute("path", config.path ||''),
            nokeys     : this.getAttribute("noKeys", config.path || ''),
            nowheel    : this.getAttribute("nowheel", config.nowheel || false),
            resize     : this.getAttribute("resize", config.resize || []),
            TW5Ratio   : this.getAttribute("TW5Ratio", config.TW5ratio || 0.8)},
            divWidth, divHeight;
        // Set div's size not to exceed a maxi width set in the widget's options
        (options["parentWidth"] < options["maxWidth"]) ? divWidth= options["parentWidth"] : divWidth = options["maxWidth"];
        divHeight = divWidth * options.TW5Ratio;
        div.style.width = divWidth + 'px';
        div.style.height = divHeight + "px";
        console.log("Div for besogo ==> width: ", divWidth,
                    "  height: ", divHeight ); 
        // get the sgf game record or the url of one, if any
        var sgfContentOrLink= (this.parseTreeNode.text || "");
        //The besogo player expects the sgf record or the link as content of the div is being passed
        div.textContent = sgfContentOrLink;
        // Create the editor into the div
        this.sgfEditor = besogoPlayer;
        // Pass a handle to the widget in the besogo editor
        var self = this;
        this.sgfEditor.widget = self;
        // Now let besogo create the sgf player
        this.sgfEditor.create(div,options);
    } catch(ex) {
        div.className = "tc-error";
        div.textContent = ex;
    }

    parent.insertBefore(div,nextSibling);
    this.domNodes.push(div);
};

  
/*
A widget with optimized performance will selectively refresh, but here we refresh always
*/
GoGameWidget.prototype.refresh = function(changedTiddlers) {
  // Regenerate and rerender the widget and
  // replace the existing DOM node
  // this.refreshSelf();
  // return true;
};


    exports.sgfeditor = GoGameWidget;

})();
