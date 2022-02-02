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
    let modalShow = function(index, ext, links) {
        if (index != -1) {
            var filteredLinks = links.filter(function(el) {
                return el.ElementId == ext && el.Id == index;
            });
            let Iframe = filteredLinks[0].Iframe;
            let app = qlik.currApp(this);
            let elementId = 'qv-object-modal-element-' + filteredLinks[0].ElementId;
            let topCss = filteredLinks[0].ShowTextBox ? 'style="height: 20%;"' : '';
            let bottomCss = filteredLinks[0].ShowTextBox ? 'style="height: 80%;"' : 'style="height: 100%;"';
            let textAreaHtml = filteredLinks[0].ShowTextBox ? '<div class="qv-object-modal--body-top"' + topCss + '><div class="qv-object-modal--body-top-text">' + filteredLinks[0].TextBoxHtml + '</div></div>' : '';

            modalId = 'qv-object-modal-' + filteredLinks[0].ElementId;
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
            $('.qv-object-modal-title').html(filteredLinks[0].Title);
            if (filteredLinks[0].UseMasterItem) {
                let masterItemHtml = '<div id="qv-object-modal-selection-' + filteredLinks[0].ElementId + '" style="height:5%; min-height: 40px;"></div><div id="' + elementId + '" style="height:90%"></div>'
                if (filteredLinks[0].ExportMasterItemData) {
                    var exportButtonHtml = '<button id="qv-object-modal--export-btn" data-id="' + filteredLinks[0].MasterItem + '" class="lui-button"><span class="lui-icon lui-icon--export"></span></button>';
                    $('.qv-object-modal--header').prepend(exportButtonHtml);
                    $('#qv-object-modal--export-btn').click(function() {
                        let id = $(this).data("id");
                        masterItemExport(id);
                    });
                };
                $('.qv-object-modal--body-bottom').html(masterItemHtml);
                $('.qv-object-modal--body-bottom').css("padding-bottom", "10px");
                app.getObject('qv-object-modal-selection-' + filteredLinks[0].ElementId, 'CurrentSelections');
                app.getObject(elementId, filteredLinks[0].MasterItem);
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