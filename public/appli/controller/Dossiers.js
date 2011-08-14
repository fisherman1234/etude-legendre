Ext.define('TP.controller.Dossiers', {
    extend: 'Ext.app.Controller',
    stores: ['Dossiers', 'TP.store.Institutions', 'TP.store.Users', 'TP.store.TypeExpertises', 'TP.store.TypeDecisions', 'TP.store.Contacts', 'TP.store.Unites', 'TP.store.TypeEtatDossiers', 'TP.store.Activites', 'TP.store.Expenses', 'TP.store.Items', 'TP.store.Categories', 'TP.store.Documents', 'TP.store.TreeActeurs'],
    models: ['Dossier', 'TP.model.Institution', 'TP.model.User', 'TP.model.TypeExpertise', 'TP.model.TypeDecision', 'TP.model.Contact', 'TP.model.TypeEtatDossier', 'TP.model.Expense', 'TP.model.Unite', 'TP.model.Activite', 'TP.model.Expense', 'TP.model.Item', 'TP.model.Categorie', 'TP.model.Document'],
    views: ['dossier.List', 'dossier.Edit', 'dossier.ShortList', 'dossier.Overview', 'TP.view.expense.List', 'TP.view.activite.List', 'TP.view.document.List', 'TP.view.dossier.Edit', 'TP.view.acteur.Tree'],

    init: function() {
        this.control({
            'dossierlist': {
                itemdblclick: this.editDossier
            },
            'dossiershortlist': {
                itemclick: this.editDossier
            },
            'dossieredit button[action=save]': {
                click: this.updateDossier
            },
            'dossieredit button[action=cancel]': {
                click: this.cancelUpdate
            }
        });
    },

    editDossier: function(grid, record) {
        var main_window = Ext.getCmp('centerArea');
        //main_window.removeAll();
        var overviewPan = Ext.getCmp('overviewPan');
        if (typeof(overviewPan) == 'undefined') {
            /*
						 * Create forms
						 */
            var formDossier = Ext.widget('dossieredit');
            formDossier.down('form').loadRecord(record);
            var expenseList = Ext.widget('expenseList');
            var activiteList = Ext.widget('activiteList');

            var documentList = Ext.widget('documentList');

            var view = Ext.widget('dossierOverview');
            main_window.add(view);
            Ext.getStore('TP.store.Activites').proxy.extraParams = {
                dossier: record.data.id
            };
            Ext.getStore('TP.store.Activites').load({
                callback: function(r, options, success) {
                    Ext.getStore('TP.store.Expenses').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Expenses').load();

                    Ext.getStore('TP.store.Documents').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Documents').load();

                    Ext.getStore('TP.store.Acteurs').proxy.extraParams = {
                        dossier_id: record.data.id
                    };
                    Ext.getStore('TP.store.Acteurs').load();
                    view.add(formDossier);
                    view.add(expenseList);
                    view.add(activiteList);
                    view.add(documentList);
                    view.add(acteurTree);

                }
            });

        } else {
            /*
					 * Update forms
					 */
            var formDossier1 = Ext.getCmp('editForm');
            formDossier1.down('form').loadRecord(record);
            Ext.getStore('TP.store.Activites').proxy.extraParams = {
                dossier: record.data.id
            };
            Ext.getStore('TP.store.Activites').load({
                callback: function(r, options, success) {
                    Ext.getStore('TP.store.Expenses').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Expenses').load();
                    Ext.getStore('TP.store.Documents').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Documents').load();

                    Ext.getStore('TP.store.Acteurs').proxy.extraParams = {
                        dossier_id: record.data.id
                    };
                    Ext.getStore('TP.store.Acteurs').load();
                }
            });

        }

    },

    updateDossier: function(button) {
        var win = button.up('panel');
        form = win.down('form');
        record = form.getRecord();
        values = form.getValues();
        record.set(values);
        record.save();
    }
});