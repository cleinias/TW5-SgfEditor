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
            maxwidth   : this.getAttribute("maxwidth", config.maxwidth || 900),
            tool       : this.getAttribute("tool", config.tool || ''),
            variants   : this.getAttribute("variants", config.variants || 1),
            path       : this.getAttribute("path", config.path ||''),
            nokeys     : this.getAttribute("noKeys", config.path || ''),
            nowheel    : this.getAttribute("nowheel", config.nowheel || false),
            resize     : this.getAttribute("resize", config.resize || [])};
        // Set div's size no to exceed maxSize
        (options["parentWidth"] < options["maxwidth"]) ? div.style.width = options["parentWidth"] + 'px' : div.style.width = options["maxwidth"] + 'px';
        div.style.height = (div.style.width * 0.80)+ 'px'; // using CGoban h/w ratio

        // get the sgf game record or the url of one, if any
        var sgfContentOrLink= (this.parseTreeNode.text || "");
        //The player expects the sgf record or the link as content of the div is being passed
        div.textContent = sgfContentOrLink;
        // Create the editor into the div
        this.sgfEditor = besogoPlayer;
        this.sgfEditor.create(div,options);
    } catch(ex) {
        div.className = "tc-error";
        div.textContent = ex;
    }
/*
 * The save sgf to content callback mechanism
 */
   var self = this;
   // 1. the handle to the widget in the besogo editor
   this.sgfEditor.widget = self;
   // 2. the callback function to update the tiddler from the besogo editor
   this.sgfEditor.editor.tiddlerUpdate = function(msg){
                                   if (msg.treeChange || msg.stoneChange || msg.markupChange) {
                                       self.saveToTiddler();                                        
                                       }
                                   }; 
   // 3. The event listener added to the besogo editor
   this.sgfEditor.editor.addListener(self.tiddlerUpdate); // Adding a listener to the editor with the function

   // 4. The function that actually saves the sgf and info file so the tiddler
   this.sgfEditor.saveToTiddler = function(){
                                     var fieldsUpdates = {}          // Objects with new values for all the tiddler's fields
                                     fieldsUpdates["text"] = self.composeSgf(self.current);
                                     for (var field; field < self.info.length; field++ ){ // Check proper data struct of info
                                             fieldsUpdates[field]= self.info[field];
                                     }
                                     self.widget.wiki.setTiddlerData(fieldsUpdates);
                                   };



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


    exports.sgfeditor = GoGameWidget;

})();
