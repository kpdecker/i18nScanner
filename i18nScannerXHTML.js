/* See license.txt */
var scanXHTML = (function() {
    var builderFactory = javax.xml.parsers.DocumentBuilderFactory.newInstance(),
        builder = builderFactory.newDocumentBuilder(),
        xpathFactory = javax.xml.xpath.XPathFactory.newInstance(),
        xpath = xpathFactory.newXPath(),

        NODESET = javax.xml.xpath.XPathConstants.NODESET ;

    return function(input, i18nTokens) {
        var doc = builder.parse(new java.io.StringBufferInputStream("<root>"+input+"</root>"));

        // Find all text nodes that are not templates and are not the child of a x-mojo-loc element
        var textNodes = xpath.evaluate("//text()", doc.getDocumentElement(), NODESET);
        for (var i = 0; i < textNodes.getLength(); i++) {
            var node = textNodes.item(i),
                value = new String(node.nodeValue),
                trim = value.replace(/^\s+|\s+$/g, '');
            if (trim && !trim.match(/^#\{.*?\}$/)) {
                var parentNode = node.getParentNode();
                while (parentNode) {
                    if (parentNode.hasAttribute && parentNode.hasAttribute("x-mojo-loc")) {
                        break;
                    }
                    parentNode = parentNode.getParentNode();
                }
                // The string has content, check that the parent is defined
                if (!parentNode) {
                    print("\tUnlocalized token: '" + value + "'");
                }
            }
        }

        // Find all elements that have the x-mojo-loc attribute defined
        var transNodes = xpath.evaluate("//*[@x-mojo-loc]", doc.getDocumentElement(), NODESET);
        for (var i = 0; i < transNodes.getLength(); i++) {
            var node = transNodes.item(i),
                textContent = node.getTextContent();    // TODO : Verify that this is the proper construct

            i18nTokens[textContent] = (i18nTokens[textContent] || 0) + 1;
        }
        
    };
})();