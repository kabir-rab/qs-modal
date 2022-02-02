// Properties

define([
        'qlik',
        'jquery',
        'ng!$q'
    ],
    function(qlik, $, $q) {
        'use strict';
        var app = qlik.currApp(this);

        function getMasterObjectList() {
            var defer = $q.defer();

            app.getAppObjectList('masterobject', function(data) {
                var masterobject = [];
                var sortedData = _.sortBy(data.qAppObjectList.qItems, function(item) {
                    return item.qData.rank;
                });

                _.each(sortedData, function(item) {
                    masterobject.push({ value: item.qInfo.qId, label: item.qMeta.title });
                });
                return defer.resolve(masterobject);
            });
            return defer.promise;
        };

        var item = {
                label: {
                    type: "string",
                    ref: "props.label",
                    label: "Button label",
                    expression: "optional",
                    defaultValue: "Button"
                },
                buttonStyle: {
                    type: "string",
                    component: "dropdown",
                    label: "Button style",
                    ref: "props.buttonStyle",
                    options: [
                        { value: 'default', label: 'Default' },
                        { value: 'lui-button--gradient', label: 'Qlik Toolbar' },
                        { value: 'lui-button--info', label: 'Info' },
                        { value: 'lui-button--danger', label: 'Error' },
                        { value: 'lui-button--warning', label: 'Warning' },
                        { value: 'lui-button--success', label: 'Success' },
                        { value: 'qv-object-hr-solid', label: 'Separator' }
                    ],
                    defaultValue: "lui-button--gradient"
                },
                textBoxOption: {
                    type: "boolean",
                    component: "switch",
                    label: "Show text box? (Top)",
                    ref: "props.textBox",
                    options: [{
                        value: true,
                        label: "Enabled"
                    }, {
                        value: false,
                        label: "Disabled"
                    }],
                    defaultValue: false
                },
                textBoxHtml: {
                    label: "Text (Plain or HTML)",
                    component: "textarea",
                    rows: 5,
                    maxlength: 100000,
                    ref: "props.textBoxHtml",
                    show: function(data) {
                        return data.props.textBox;
                    }
                },
                contentType: {
                    type: "string",
                    component: "dropdown",
                    label: "Master Item or iFrame?",
                    ref: "props.itemType",
                    options: [{
                        value: 1,
                        label: "iFrame"
                    }, {
                        value: 2,
                        label: "Master Item"
                    }],
                    defaultValue: 1
                },
                iFrameHtmlSwitch: {
                    type: "boolean",
                    component: "switch",
                    label: "Use iframe html",
                    ref: "props.iFrameHtmlSwitch",
                    options: [{
                        value: true,
                        label: "Enabled"
                    }, {
                        value: false,
                        label: "Disabled"
                    }],
                    defaultValue: false,
                    show: function(data) {
                        return data.props.itemType === 1;
                    }
                },
                iframeAddress: {
                    type: "string",
                    ref: "props.iframeAddress",
                    label: "iFrame address/src",
                    expression: "optional",
                    show: function(data) {
                        return !data.props.iFrameHtmlSwitch && data.props.itemType === 1;
                    }
                },
                iFrameHtml: {
                    label: "iFrame HTML",
                    component: "textarea",
                    rows: 5,
                    maxlength: 1000,
                    ref: "props.iFrameHtml",
                    show: function(data) {
                        return data.props.iFrameHtmlSwitch && data.props.itemType === 1;
                    }
                },
                dropdown: {
                    type: "string",
                    component: "dropdown",
                    label: "Master Items",
                    ref: "props.masterItem",
                    options: function() {
                        return getMasterObjectList();
                    },
                    defaultValue: "Select a master item",
                    show: function(data) {
                        return data.props.itemType === 2;
                    }
                },
                chartExportOption: {
                    type: "boolean",
                    component: "switch",
                    label: "Enable export?",
                    ref: "props.export",
                    options: [{
                        value: true,
                        label: "Enabled"
                    }, {
                        value: false,
                        label: "Disabled"
                    }],
                    defaultValue: false,
                    show: function(data) {
                        return data.props.itemType === 2;
                    }
                }
            },
            itemSection = {
                type: "array",
                ref: "listItems",
                label: "Buttons",
                itemTitleRef: "props.label",
                allowAdd: true,
                allowRemove: true,
                allowMove: true,
                addTranslation: "Add buttons",
                items: item
            },
            imageCheckBox = {
                ref: "props.imgShow",
                label: "Show image (top)",
                type: "boolean",
                component: "switch",
                options: [{
                    value: true,
                    label: "Show"
                }, {
                    value: false,
                    label: "Hide"
                }],
                default: false
            },
            imageAddress = {
                label: "Image address",
                component: "textarea",
                rows: 5,
                maxlength: 1000,
                ref: "props.imageAddress"
            },
            buttonPosition = {
                type: "string",
                component: "dropdown",
                label: "Button position",
                ref: "props.buttonPosition",
                options: [
                    { value: 'center', label: 'Center' },
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' }
                ],
                defaultValue: "center"
            },
            exSettings = {
                type: "items",
                label: "Style and image",
                items: {
                    showImg: imageCheckBox,
                    imgAddress: imageAddress,
                    buttonPos: buttonPosition,
                }
            },
            buttonList = {
                component: "expandable-items",
                label: "Extension settings",
                items: {
                    exSettings: exSettings,
                    list: itemSection
                },
            },
            setting = {
                uses: "settings"
            };
        return {
            type: "items",
            component: "accordion",
            items: {
                buttons: buttonList,
                settings: setting
            }
        };
    });