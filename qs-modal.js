define([
        "qlik",
        "jquery",
        "./lib/js/modal",
        "./lib/js/prop",
        "./lib/js/initialProps",
        "text!./lib/css/qs-modal.css",
    ],
    function(qlik, $jq, modal, props, initProps, css) {
        $("<style>").html(css).appendTo("head");
        return {
            initialProperties: initProps,
            definition: props,
            support: {
                snapshot: false,
                export: false,
                exportData: false
            },
            resize: function($element) {
                let eleHeight = $element.height() - 70;
                let eleWidth = $element.width();
                let imgHeight = $('.qv-object-img').height();
                let imgWidth = $('.qv-object-img').width();
                //let realHeight = document.querySelector('.qv-object-img').naturalHeight;

                $('.qv-object-img').css('height', eleHeight);
                $('.qv-object-img').css('max-width', eleWidth);
                //$('.qv-object-img').css('max-height', realHeight);
            },
            paint: function($element, layout) {
                let links = [];
                let extensionId = layout.qInfo.qId;
                let imageAddress = layout.props.imageAddress;
                let imageHtml = layout.props.imgShow ? '<div><img src="' + imageAddress + '" class="qv-object-img"></div>' : '';
                let totalButtons = layout.listItems.length;
                let html = '<div class="qv-object-container">' + imageHtml + '<div class="qv-object-btn" style="text-align: ' + layout.props.buttonPosition + ';">';
                for (let i = 0; i < totalButtons; i++) {
                    if (layout.listItems[i].props.buttonStyle != 'qv-object-hr-solid') {
                        let url = layout.listItems[i].props.iframeAddress;
                        let iFrame = layout.listItems[i].props.iFrameHtmlSwitch ? layout.listItems[i].props.iFrameHtml : '<iframe id="msForm" width="100%" height= "95%" src= "' + url + '" frameborder= "0" marginwidth= "0" marginheight= "0" style= "border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>';
                        let label = layout.listItems[i].props.label;
                        let buttonDetails = {
                            Url: url,
                            Iframe: iFrame,
                            Id: i,
                            UseHtml: layout.listItems[i].props.iFrameHtmlSwitch,
                            Title: label,
                            UseMasterItem: layout.listItems[i].props.itemType === 2 ? true : false,
                            MasterItem: layout.listItems[i].props.masterItem,
                            ElementId: extensionId,
                            ExportMasterItemData: layout.listItems[i].props.export,
                            ShowTextBox: layout.listItems[i].props.textBox,
                            TextBoxHtml: layout.listItems[i].props.textBoxHtml
                        };
                        links.push(buttonDetails);
                        html += '<button data-id="' + i + '" class="qv-object-btn-margin-x-y modal-btn-' + extensionId + ' lui-button  ' + layout.listItems[i].props.buttonStyle + '">' + label + '</button>';
                    } else {
                        html += '<hr class="qv-object-hr-solid">';
                    }
                }
                html += '</div></div>';
                qlik.resize();
                $element.html(html);
                //$('.modal-btn-' + extensionId).off('click');
                $('.modal-btn-' + extensionId).click(function() {
                    let id = $(this).data("id");
                    modal.modalShow(id, extensionId, links);
                });
                return qlik.Promise.resolve();
            }
        };

    }
);