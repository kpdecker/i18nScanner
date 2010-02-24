/* See license.txt */
// Overridable flags ignore/record flags
// TODO : Allow partial tail comparison (i.e. controller.setupWidget vs. this.controller.setupWidget)
//    and reduce the scope of some of these.
var ignoreCalls = ignoreCalls || {
    '$': true,
    '$L': true,
    '$LL': true,
    pushScene: true,
    swapScene: true,
    popScenesTo: true,
    querySelector: true,
    'this.controller.setupWidget': true,
    'this.controller.setWidgetModel': true,
    'this.controller.get': true,
    'this.controller.popScenesTo': true,
    serviceRequest: true,
    observe: true,
    stopObserving: true,
    stopListening: true,
    info: true,
    'this.eventManager.register': true,
    addClassName: true,
    hasClassName: true,
    removeClassName: true,
    listen: true,
    'console.log': true,
    'Mojo.Log.info': true,
    'Mojo.Log.warn': true,
    'Mojo.Log.error': true,
    'Mojo.Animation.animateStyle': true,
    'Mojo.Format.formatDate': true,
};
var ignoreFields = ignoreFields || {
    textFieldName: true,
    template: true,
    itemTemplate: true,
    listTemplate: true,
    emptyTemplate: true,
    dividerTemplate: true,
    buttonClass: true,
    modelProperty: true,
    disabledProperty: true,
    menuClass: true,
    id: true,
    method: true,
    target: true,
    command: true,
    icon: true,
    iconPath: true,
    
    height: true,
    curve: true,

    toggleCmd: true,
    value: true,
    type: true,
};
var ignoreValues = ignoreValues || {
    'px': true,
    '': true
}

var recordCalls = recordCalls || {
    '$L': {},
    '$LL': {}
};
