/* See license.txt */
(function (args) {
    var i18nTokens = {};

    if (!args[0]) {
        print("Usage: i18nScanner.js file ...");
        quit(1);
    }

    for (var i = 0; i < args.length; i++) {
        var input = readFile(args[i]);
        if (input === undefined) {
            print("Couldn't open file '" + args[i] + "'");
            quit(1);
        }

        print(args[i]);

        if (args[i].match(/.js$/)) {
            scanJS(input, i18nTokens);
        } else if (args[i].match(/.html?$/)) {
            scanXHTML(input, i18nTokens);
        }
    }

    print("i18n Tokens");
    for (var token in i18nTokens) {
        if (i18nTokens.hasOwnProperty(token)) {
            print("\t'" + token + "'", i18nTokens[token]);
        }
    }
}(arguments));