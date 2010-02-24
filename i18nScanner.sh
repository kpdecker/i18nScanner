#! /bin/sh

if [[ ! -d $I18N_DIR ]]; then
  I18N_DIR=`dirname $0`
fi
if [[ ! -d $RHINO_DIR ]]; then
  RHINO_DIR=$I18N_DIR/lib
fi
if [[ ! -d $JSPARSER_DIR ]]; then
  JSPARSER_DIR=$I18N_DIR/jsParser
fi

java -cp $RHINO_DIR/js.jar org.mozilla.javascript.tools.shell.Main \
    -f $JSPARSER_DIR/jsParserLogger.js \
    -f $JSPARSER_DIR/rhinoLogger.js \
    -f $JSPARSER_DIR/jsLineBuffer.js \
    -f $JSPARSER_DIR/jsParser.js \
    -f $JSPARSER_DIR/jsLex.js \
    -f $I18N_DIR/i18nScannerJS.js \
    -f $I18N_DIR/i18nScannerXHTML.js \
    -f $I18N_DIR/mojoIgnores.js \
    $I18N_DIR/i18nScanner.js \
    $@
