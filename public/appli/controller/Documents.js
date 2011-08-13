Ext.define('TP.controller.Documents', {
    extend: 'Ext.app.Controller',
    stores: ['Documents'],
    models: ['Document'],
    views: ['document.List', 'document.Edit'],

    init: function() {
        this.control({
            'documentList button[action=new]': {
                itemclick: this.newDocument
            },
            'documentEdit button[action=save]': {
                click: this.updateDocument
            },
            'documentEdit button[action=delete]': {
                click: this.cancelUpdate
            },
            'documentList': {
                itemclick: this.editDocument
            }
        });
    },

    newDocument: function() {
        var documentItem = Ext.widget('documentEdit');
    },
    updateDocument: function(button) {
        var win = button.up('window');
        form = win.down('form');
				record = form.getRecord();
        if (typeof(record)!=='undefined'){
					url = '/documents/'+record.data.id;
					method = 'PUT';
				}else{
					url = '/documents';
					method = 'POST';
				}

        //console.log(form);
        form.submit({
            url: url,
            method: method,
            params: {
                dossier_id: Ext.getStore('TP.store.Documents').proxy.extraParams.dossier
            },

            success: function(form) {
								win.close();
                Ext.getStore('TP.store.Documents').load();
            }
        });


    },
    editDocument: function(grid, record) {
        var formEdit = Ext.widget('documentEdit');
        formEdit.down('form').loadRecord(record);
    }
});