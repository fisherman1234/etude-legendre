Ext.define('TP.controller.Documents', {
    extend: 'Ext.app.Controller',
    stores: ['Documents', 'TP.store.Contacts'],
    models: ['Document', 'TP.model.Contact'],
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
                click: this.deleteDocument
            },
            'documentList': {
                itemdblclick: this.editDocument
            }
        });
    },

    newDocument: function() {
        var documentItem = Ext.widget('documentEdit');
    },
    updateDocument: function(button) {
        var win = button.up('window');
        form = win.down('form');
        if (form.form.isValid()) {
            record = form.getRecord();
            if (typeof(record) !== 'undefined') {
                url = '/documents/' + record.data.id;
                method = 'PUT';
            } else {
                url = '/documents';
                method = 'POST';
            }

            //console.log(form);
            form.submit({
                url: url,
                method: method,
                params: {
                    dossier_id: Ext.getStore('TP.store.Documents').proxy.extraParams.dossier,
                    activite_id: Ext.getStore('TP.store.Documents').proxy.extraParams.activite_id
                },

                success: function(form) {
                    win.close();
                    Ext.getStore('TP.store.Documents').load();
                    Ext.getStore('TP.store.ActiviteToDocuments').load();

                }
            });
        }

    },
    editDocument: function(grid, record) {
        var formEdit = Ext.widget('documentEdit');
        formEdit.down('form').loadRecord(record);
        formEdit.getDockedItems()[1].items.items[3].show();
				

    },
    deleteDocument: function(button) {
        var win = button.up('window');
        form = win.down('form');
        record = form.getRecord();
        Ext.Msg.show({
            title: 'Supprimer cet enregistrement',
            msg: 'Voulez-vous supprimer cet enregistrement ?',
            buttons: Ext.Msg.YESNO,
            fn: function(id) {
                if (id == "yes") {
                    Ext.getStore('TP.store.Documents').remove(record);
                }
                win.close();
            },
            icon: Ext.Msg.QUESTION
        });
    }
});