/* See license.txt */
var scanJS = (function() {
    function toJS(node) {
        return node.toJS ? node.toJS() : node;
    }
    function ignoreValue(value, ignoreList) {
        return value in ignoreList;
    }

    return function(input, i18nTokens) {
        function examine_node(node) {
            stack.unshift(node);
            //print("\tExamine_Node: " + node);
            if (node.id == "(string)") {
                if (ignoreValue(node.value, ignoreValues)) {
                    // Ignore empty strings
                    // TODO : Add a verbose mode where these are reported
                    return;
                }
                
                var parent = stack[1];
                if (parent.id === '(') {
                    // We are in a function call, ignore the known cases
                    var rootCall = parent.left;
                    while (rootCall.left) {
                        if (ignoreValue(toJS(rootCall), ignoreCalls)) {
                            rootCall = undefined;
                            break;
                        }
                        rootCall = rootCall.right;
                    }
                    
                    var callName = rootCall && (rootCall.value || rootCall);
                    if (rootCall && !ignoreValue(callName, ignoreCalls)) {
                        print("\tLine: ", node.line, " Character: ", node.character + " '" + node.value + "'");
                        print("\t\tCall: ", toJS(parent.left));
                    } else if (rootCall && ignoreValue(callName, recordCalls)) {
                        i18nTokens[node.value] = (i18nTokens[node.value] || 0) + 1;
                    }
                } else if (parent.id === ':') {
                    var field = parent.left;
                    // Field == node for case statements
                    if (field != node
                            && !ignoreValue(field.value || field, ignoreFields)) {
                        print("\tLine: ", node.line, " Character: ", node.character + " '" + node.value + "'");
                        print("\t\tField Name: ", field.value || field);
                    }
                } else if (parent.id === '=') {
                    
                    var assign = parent.left;
                    if (assign.id === '.') {
                        var field = assign.right;
                        if (!ignoreValue(field.value || field, ignoreFields)) {
                            print("\tLine: ", node.line, " Character: ", node.character + " '" + node.value + "'");
                            print("\t\tField Name: ", field.value || field);
                        }
                    } else {
                        print("\tLine: ", node.line, " Character: ", node.character + " '" + node.value + "'");
                        print("\t\tAssign: ", toJS(parent));
                    }
                } else if (parent.id === "===" || parent.id === "=="
                        || parent.id === "!==" || parent.id === "!=") {
                    // Ignore these, under the hope that we aren't attempting to compare i18n tokens before and after
                    // TODO : Add a verbose mode that will check for these
                } else {
                    print("\tLine: ", node.line, " Character: ", node.character + " '" + node.value + "'");
                    print("\t\tUnknown String Parent: ", toJS(stack[1]));
                }
            }
            
            var children = ['left', 'right', 'else', 'finally'];
            for (var i = 0; i < children.length; i++) {
                examine_tree(node[children[i]]);
            }
            stack.shift();
        }
        function examine_tree(node) {
            if (node instanceof Array) {
                examine_array(node);
            } else if (node) {
                examine_node(node);
            }
        }
        function examine_array(node) {
            var len = node.length;
            for (var i = 0; i < len; i++) {
                var child = node[i];
    
                examine_node(child);
            }
        }

        var stack = [],
            lineBuffer = new jsLineBuffer(input),
            parse = new jsParser(lineBuffer, new RhinoLogger(lineBuffer))
        examine_tree(parse.parse_tree());
    };
})();