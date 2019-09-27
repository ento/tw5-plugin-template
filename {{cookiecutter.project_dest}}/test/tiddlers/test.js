/*\
title: test.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Suite description.
\*/

(function(){
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  /* helper functions taken from TiddlyWiki5/editions/test/tiddlers/tests/test-widget.js */
  var widget = require("$:/core/modules/widgets/widget.js");
  function createWidgetNode(parseTreeNode,wiki) {
    return new widget.widget(parseTreeNode,{
      wiki: wiki,
      document: $tw.fakeDocument
    });
  }

  function parseText(text, wiki, options) {
    var parser = wiki.parseText("text/vnd.tiddlywiki", text, options);
    return parser ? {type: "widget", children: parser.tree} : undefined;
  }

  function renderWidgetNode(widgetNode) {
    $tw.fakeDocument.setSequenceNumber(0);
    var wrapper = $tw.fakeDocument.createElement("div");
    widgetNode.render(wrapper, null);
    return wrapper;
  }

  function refreshWidgetNode(widgetNode,wrapper,changes) {
    var changedTiddlers = {};
    if(changes) {
      $tw.utils.each(changes,function(title) {
        changedTiddlers[title] = true;
      });
    }
    widgetNode.refresh(changedTiddlers,wrapper,null);
  }

  describe("{{ cookiecutter.plugin_name }}", function() {
    it("should an example test case", function() {
      var wiki = new $tw.Wiki();
      wiki.addTiddler({title: "Hello", text: "Hello", type: "text/vnd.tiddlywiki"});
      var text = "<$link to=Hello/>";
      var widgetNode = createWidgetNode(parseText(text, wiki, {parseAsInline: true}), wiki);
      var wrapper = renderWidgetNode(widgetNode);
      expect(wrapper.sequenceNumber).toBe(0);
      expect(wrapper.outerHTML).toBe('<div><a class="tc-tiddlylink tc-tiddlylink-resolves" href="#Hello">Hello</a></div>');
    });
  });
})();
