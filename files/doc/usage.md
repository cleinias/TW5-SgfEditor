!!!Configurable options 

Wiki-wide options for the sgf editor are set in the config panel, with default values indicated in square brackets below. 

To override a wiki-wide value for a particular tiddler, add a field with the name of the desired option and set it to the desired value. 

For instance, to have a particular tiddler start showing a game from move 20, add the field "path" with value "20 to its tiddler.

*`size` [//19//] sets the size of the empty board loaded if no SGF text is provided.
Square sizes can be specified by a single number (e.g., "19", "13") and rectangular sizes are specified by two numbers separated by a colon (e.g., "9:15"). Sizes from "1:1" to "52:52" are supported.

* `realstones` [//false//] sets board rendering to use realistic stone images if set to a truthy value. Otherwise, defaults to flat SVG stones.

* `shadows` [//auto//] selects whether shadows will be added beneath the stones. If omitted or set to `auto`, shadows will be added for realistic stones, but not for SVG stones. If set to `off`, shadows will not be added. If set to any other truthy value, shadows will always be added.

* `coord` [//none//] sets the initial coordinate system, which can be choosen from the following options:
   ** `none` no coordinate labels
   ** `western` chess-style coordinates using numbers and letters
   ** `eastern` coordinates using numbers and CJK symbols
   ** `numeric` coordinates using only numbers
   ** `corner` corner-relative system using numbers and letters
   ** `eastcor` corner-relative system using numbers and CJK symbols

* `panels` [//control+names+comment+tool+tree+file//]<div> 
   A plus-separated list of which GUI elements are added in the GUI. The following panels are supported:</div>
   
   ** `control` navigation control buttons
   
   ** `names` player names, ranks, and captures
   
   ** `comment` comments and game info
   
   ** `tool` editing tool selector buttons
   
   ** `tree` game tree visualization
   
   ** `file` save, load, and new board buttons

* `maxwidth` [//600//] sets the maximum width (in pixels) of the editor. 

* `tool` [//none//] sets the selected tool.

* `variants` [//0//] sets the variant style, formatted as number 0-3 according to SGF standard.

* `path` [//n//] string to set the initial position in the game tree of the loaded SGF. The letter `N` or `n` sets to next mode. The letter `B` or `b` sets to branch mode. One or more digits specifies the number of nodes to move forward always taking the first child (when in next mode), or the child to select (when in branch mode). All other characters are ignored but used to separate numbers. Next is the default mode. Zero in branch mode selects the last child. Examples:
   ** `20` moves to the 21st node in the mainline of the game tree, which typically contains the 20th move assuming no move in the root and no empty/setup nodes besides the root.
   ** `n5b1b1-1z1-1n10` does the same as `20`, but overly verbose and redundant.
   ** `b2,3,0,1` navigates following the 2nd child, 3rd child, last child, and first child over four steps.

** `nokeys` [//false//] turns off navigation key bindings if set to a truthy value. Otherwise, by default, navigation keys are enabled and the `tabindex` attribute of the container div is set to `0` (to enable keypress focus), if not already set.

* `nowheel` [//false//] turns off mousewheel navigation if set to a truthy value. Otherwise, by default, mousewheel navigation is enabled.

* `resize` [//maxwidth//] sets the resizing behavior of the widget, if not set, with the following options:
   ** `auto` is the  responsive resizing behavior, which depends on the settings of the following companion parameters
      ** `orient` can be set to `landscape`, `portrait`, `auto` or `view`
         ** `portrait` or `landscape` fixes the orientation of the widget as specified
         ** `auto` is the default behavior, which switches from `landscape` to `portrait` if the parent container width is less than `transwidth`
         ** `view` is the same as `auto`, but also switches from `landscape` to `portrait` if the parent container width is less than viewport height
      ** `transwidth` sets the width to transition from `landscape` to `portrait` for `auto` and `view` orientation modes, defaulting 600 pixels if not set
      ** `maxwidth` sets a limit on the maximum width, otherwise the widget will fill the width of the parent container if omitted
      ** `portratio` sets the height-to-width ratio for `portrait` mode, expressed as a percentage. Defaults to 200% if not set. If set to a truthy value that converts to `NaN`, then the GUI panels will have a compact automatic height.
      ** `landratio` sets the width-to-height ratio for `landscape` mode, expressed as a percentage. Defaults to 200% if not set.
      ** `minpanelswidth` sets the smallest width for the GUI panels in `landscape` mode, where the board and widget height would be shrunk to ensure that this minimum is met, defaulting to 350 pixels if not set
      ** `minpanelsheight` sets the smallest height for the GUI panels in `portrait` mode (if height is computed using `portratio`), defaulting to 400 pixels if not set
   ** `fixed`  requires the width and height of the container div to be set, as they will be accordingly
   ** `none` or any other truthy value that is not `auto` or `fixed` disables all resizing
