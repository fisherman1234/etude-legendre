Ext.define('TP.controller.Dossiers', {
    extend: 'Ext.app.Controller',
    stores: ['TP.store.ContactDossiers', 'TP.store.CurrentDossiers', 'TP.store.Dossiers', 'TP.store.Institutions', 'TP.store.Users', 'TP.store.TypeExpertises', 'TP.store.TypeDecisions', 'TP.store.Contacts', 'TP.store.Unites', 'TP.store.TypeEtatDossiers', 'TP.store.Activites', 'TP.store.Expenses', 'TP.store.Items', 'TP.store.Categories', 'TP.store.Documents', 'TP.store.TreeActeurs', 'TP.store.ContactActeurs', 'TP.store.Acteurs', 'TP.store.TypeIntervenants', 'TP.store.TypeInstitutions', 'TP.store.TypeActivites', 'TP.store.Communications', 'TP.store.Reminders'],

    models: ['Dossier', 'TP.model.Institution', 'TP.model.User', 'TP.model.TypeExpertise', 'TP.model.TypeDecision', 'TP.model.Contact', 'TP.model.TypeEtatDossier', 'TP.model.Expense', 'TP.model.Unite', 'TP.model.Activite', 'TP.model.Expense', 'TP.model.Item', 'TP.model.Categorie', 'TP.model.Document', 'TP.model.ContactActeur', 'TP.model.Acteur', 'TP.model.TypeIntervenant', 'TP.model.TypeInstitution', 'TP.model.TypeActivite', 'TP.model.Communication', 'TP.model.Reminder'],

    views: ['dossier.AllDossiers', 'dossier.Summary','dossier.List', 'dossier.Edit', 'dossier.ShortList', 'dossier.Overview', 'TP.view.expense.List', 'TP.view.activite.List', 'TP.view.activite.Overview', 'TP.view.document.List', 'TP.view.dossier.Edit', 'TP.view.acteur.Tree', 'dossier.Contact', 'TP.view.contactacteur.Edit', 'TP.view.contact.EditLight', 'TP.view.contact.EditLight', 'TP.view.institution.EditForm', 'TP.view.reminder.ShortList'],

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
                //click: this.cancelUpdate
            },
            'dossierContact button[action=add-contact]': {
                click: this.addContact
            }
        });
    },
    addContact: function() {
        var addContact = Ext.widget('contactActeurAdd');
    },
    editDossier: function(grid, record) {
        var main_window = Ext.getCmp('centerArea');
        //main_window.removeAll();
        var overviewPan = Ext.getCmp('overviewPan');

        Ext.getStore('TP.store.Reminders').clearFilter();
        Ext.getStore('TP.store.Reminders').filter("dossier_id", record.data.id);
				Ext.getStore('TP.store.CurrentDossiers').loadRecords([record]); 
        
				
				if (typeof(overviewPan) == 'undefined') {
            /*
						 * Create forms
						 */
            var formDossier = Ext.widget('dossieredit');
            formDossier.down('form').loadRecord(record);
            var expenseList = Ext.widget('expenseList');
            var activiteList = Ext.widget('activiteOverview');
						var dossierSummary = Ext.widget("dossierSummary");
            var documentList = Ext.widget('documentList');
            var viewport = Ext.widget('dossierOverview');
            main_window.add(viewport);
            var view = Ext.getCmp('dossierCenter');

            Ext.getStore('TP.store.Activites').proxy.extraParams = {
                dossier: record.data.id
            };
            Ext.getStore('TP.store.Activites').load({
                callback: function(r, options, success) {
                    Ext.getStore('TP.store.Expenses').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Expenses').load();

                    Ext.getStore('TP.store.Reminders').proxy.extraParams = {
                        dossier: record.data.id
                    };

                    Ext.getStore('TP.store.Documents').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Documents').load();

                    Ext.getStore('TP.store.TreeActeurs').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    //Ext.getStore('TP.store.TreeActeurs').load(); NOT NEEDED HERE OTHERWISE DOUBLE CALL
                    Ext.getStore('TP.store.ContactActeurs').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.ContactActeurs').load();

                    Ext.getStore('TP.store.Acteurs').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Acteurs').load();

                    Ext.getStore('TP.store.Communications').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Communications').load();

                    var acteurTree = Ext.widget('acteurTree');
                    var dossierContact = Ext.widget('dossierContact');
										view.add(dossierSummary);
                    view.add(formDossier);
                    view.add(expenseList);
                    view.add(activiteList);
                    view.add(documentList);
                    view.add(dossierContact);
										main_window.layout.setActiveItem(1);
                }
            });

        } else {
            /*
					 * Update forms
					 */
						main_window.layout.setActiveItem(1);
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

                    Ext.getStore('TP.store.TreeActeurs').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.TreeActeurs').load();

                    Ext.getStore('TP.store.ContactActeurs').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Reminders').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.ContactActeurs').load();

                    Ext.getStore('TP.store.Acteurs').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Acteurs').load();

                    Ext.getStore('TP.store.Acteurs').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Acteurs').load();

                    Ext.getStore('TP.store.Communications').proxy.extraParams = {
                        dossier: record.data.id
                    };
                    Ext.getStore('TP.store.Communications').load();
                }
            });

        }

    },

    updateDossier: function(button) {
        var win = button.up('panel');
        form = win.down('form');
        if (form.form.isValid()) {
            record = form.getRecord();
            values = form.getValues();
            record.set(values);
            record.save();
        }

    }
});