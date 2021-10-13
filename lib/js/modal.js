define(['qlik'], function(qlik) {
    'use strict';
    let modalId;
    let masterItemExport = function(maserItemId) {
        let app = qlik.currApp(this);
        app.visualization.get(maserItemId).then(function(vis) {
            vis.exportData({ format: 'OOXML', state: 'A' }).then(function(link) {
                window.open(link);
            });
        });
    };
    let modalShow = function(index) {
        if (index != -1) {
            console.log(links[index].ShowTextBox, "show text")
            let Iframe = links[index].Iframe;
            let app = qlik.currApp(this);
            let elementId = 'qv-object-modal-element-' + links[index].ElementId;
            let topCss = links[index].ShowTextBox ? 'style="height: 20%;"' : '';
            let bottomCss = links[index].ShowTextBox ? 'style="height: 80%;"' : 'style="height: 100%;"';
            let textAreaHtml = links[index].ShowTextBox ? '<div class="qv-object-modal--body-top"' + topCss + '><div class="qv-object-modal--body-top-text">' + links[index].TextBoxHtml + '</div></div>' : '';

            modalId = 'qv-object-modal-' + links[index].ElementId;
            let modalHtml = '<div id="' + modalId + '">';
            modalHtml += '    <div class="qv-object-modal--overlay">';
            modalHtml += '        <div class="qv-object-modal--content-container">';
            modalHtml += '            <div class="qv-object-modal--content">';
            modalHtml += '                <div class="qv-object-modal--header"><h4 class="qv-object-modal-title">Title</h4><button type="button" class="qv-object-close"><span>×</span></button></div>';
            modalHtml += '                  <div class="qv-object-modal--body">' + textAreaHtml + '<div class="qv-object-modal--body-bottom" ' + bottomCss + ' id=""></div></div>';
            modalHtml += '            </div>';
            modalHtml += '        </div>';
            modalHtml += '    </div>';
            modalHtml += '</div>';

            $(document.body).append(modalHtml);
            $('.qv-object-close').click(function() {
                modalShow(-1);
            });

            $('.qv-object-modal--overlay').toggleClass("qv-object-modal--active")
            $('.qv-object-modal-title').html(links[index].Title);
            if (links[index].UseMasterItem) {
                let masterItemHtml = '<div id="qv-object-modal-selection-' + links[index].ElementId + '" style="height:5%; min-height: 40px;"></div><div id="' + elementId + '" style="height:90%"></div>'
                if (links[index].ExportMasterItemData) {
                    var exportButtonHtml = '<button id="qv-object-modal--export-btn" data-id="' + links[index].MasterItem + '" class="lui-button"><span class="lui-icon lui-icon--export"></span></button>';
                    $('.qv-object-modal--header').prepend(exportButtonHtml);
                    $('.qv-object-modal--body-bottom').html(masterItemHtml);
                    $('.qv-object-modal--body-bottom').css("padding-bottom", "10px");
                    $('#qv-object-modal--export-btn').click(function() {
                        let id = $(this).data("id");
                        masterItemExport(id);
                    });
                };
                app.getObject('qv-object-modal-selection-' + links[index].ElementId, 'CurrentSelections');
                app.getObject(elementId, links[index].MasterItem);
            } else {
                $('.qv-object-modal--body-bottom').html(Iframe);
            }
        } else {
            $('.qv-object-modal--body').html('');
            $('.qv-object-modal--overlay').toggleClass("qv-object-modal--active");
            $('#' + modalId).remove();
        }
    }
    return {
        modalShow
    }

});