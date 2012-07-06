Ext.define('TP.controller.Dossiers', {
    extend:'Ext.app.Controller',
    stores:['TP.store.Civilites','TP.store.TypeActivites', 'TP.store.DossierCounts', 'TP.store.ContactDossiers', 'TP.store.CurrentDossiers', 'TP.store.Institutions', 'TP.store.Users', 'TP.store.TypeExpertises', 'TP.store.TypeDecisions', 'TP.store.Contacts', 'TP.store.Unites', 'TP.store.TypeEtatDossiers', 'TP.store.Activites', 'TP.store.Expenses', 'TP.store.Items', 'TP.store.Categories', 'TP.store.Documents', 'TP.store.TreeActeurs', 'TP.store.ContactActeurs', 'TP.store.Acteurs', 'TP.store.TypeIntervenants', 'TP.store.TypeInstitutions', 'TP.store.Communications', 'TP.store.Reminders', 'TP.store.Dossiers', 'TP.store.MessageTemplates', 'TP.store.TypeCivilitesCorrespondances', 'TP.store.TypeDocuments', 'TP.store.Consignations', 'TP.store.StatusConsignations'],

    models:['Dossier', 'TP.model.Institution', 'TP.model.User', 'TP.model.TypeExpertise', 'TP.model.TypeDecision', 'TP.model.Contact', 'TP.model.TypeEtatDossier', 'TP.model.Expense', 'TP.model.Unite', 'TP.model.Activite', 'TP.model.Expense', 'TP.model.Item', 'TP.model.Categorie', 'TP.model.Document', 'TP.model.ContactActeur', 'TP.model.Acteur', 'TP.model.TypeIntervenant', 'TP.model.TypeInstitution', 'TP.model.TypeActivite', 'TP.model.Communication', 'TP.model.Reminder', 'TP.model.MessageTemplate', 'TP.model.TypeCivilitesCorrespondance', 'TP.model.TypeDocument', 'TP.model.Consignation', 'TP.model.Civilite'],

    views:['dossier.AllDossiers', 'dossier.Summary', 'dossier.List', 'dossier.Edit', 'dossier.ShortList', 'dossier.Overview', 'TP.view.expense.List', 'TP.view.activite.List', 'TP.view.activite.Overview', 'TP.view.document.List', 'TP.view.dossier.Edit', 'TP.view.acteur.Tree', 'dossier.Contact', 'TP.view.contactacteur.Edit', 'TP.view.contact.EditLight', 'TP.view.contact.EditLight', 'TP.view.institution.EditForm', 'TP.view.reminder.ShortList', 'dossier.NewDossier', 'dossier.FormDossier', 'dossier.FindDossier', 'dossier.LargeList', 'TP.view.consignation.List', 'TP.view.consignation.Edit'],

    init:function () {
        this.control({
            'dossierlist':{
                itemdblclick:this.editDossier
            },
            'dossiershortlist':{
                itemclick:this.editDossier
            },
            'dossieredit button[action=save]':{
                click:this.updateDossier
            },
            'dossieredit button[action=cancel]':{
                //click: this.cancelUpdate
            },
            'dossierContact button[action=add-contact]':{
                click:this.addContact
            },
            'dossierNewDossier button[action=cancel]':{
                click:this.cancelAddDossier
            },
            'dossierNewDossier button[action=save]':{
                click:this.saveNewDossier
            },
            'dossierFindDossier button[action=close]':{
                click:this.closeSearch
            },
            'dossierLargeList':{
                itemdblclick:this.openDossier
            }


        });
    },
    closeSearch:function (button) {
        var win = button.up('window');
        win.close();
    },
    openDossier:function (grid, record) {
        this.editDossier(grid, record);
        Ext.getCmp('main_window').items.items[1].getSelectionModel().select(grid.store.indexOf(record));
        var win = grid.up('window');
        win.close();
    },
    addContact:function () {
        var addContact = Ext.widget('contactActeurAdd');
    },
    editDossier:function (grid, record) {
        var overviewPan = Ext.getCmp('overviewPan');
        var main_window = Ext.getCmp('centerArea');

        Ext.getStore('TP.store.Dossiers').setBaseParams(record.data.id);
        Ext.getStore('TP.store.Dossiers').loadEntireDossier(record.data.id);
        if (typeof(overviewPan) == 'undefined') {
            this.createTabs();
        }
        main_window.layout.setActiveItem(1);


        Ext.getCmp('overviewPan').setTitle(record.data.nom_dossier + " - " + record.data.institution_nom);


    },

    updateDossier:function (button) {
        var win = button.up('panel');
        form = win.down('form');
        if (form.form.isValid()) {
            record = form.getRecord();
            values = form.getValues();

            record = Ext.getStore('TP.store.Dossiers').findRecord('id', record.data.id);
            record.set(values);
            Ext.getStore('TP.store.Dossiers').sync();
        }

    },
    saveNewDossier:function (button) {
        var win = button.up('window');
        form = win.down('form');
        if (form.form.isValid()) {
            values = form.getValues();
            record = Ext.ModelManager.create(values, 'TP.model.Dossier');
            Ext.getStore('TP.store.Dossiers').insert(0, record);
            Ext.getStore('TP.store.Dossiers').sync();
            win.close();
        }
    },
    cancelAddDossier:function (button) {
        var win = button.up('window');
        win.close();
    },
    createTabs:function () {
        var main_window = Ext.getCmp('centerArea');
        var formDossier = Ext.widget('dossieredit');
        var expenseList = Ext.widget('expenseList');
        var activiteList = Ext.widget('activiteOverview');
        var dossierSummary = Ext.widget("dossierSummary");
        var documentList = Ext.widget('documentList');
        var viewport = Ext.widget('dossierOverview');
        var acteurTree = Ext.widget('acteurTree');
        var dossierContact = Ext.widget('dossierContact');
        var dossierConsignations = Ext.widget('consignationList');
        
        main_window.add(viewport);
        var view = Ext.getCmp('dossierCenter');
        view.add(dossierSummary);
        view.add(formDossier);
        view.add(expenseList);
        view.add(activiteList);
        view.add(documentList);
        view.add(dossierContact);
        view.add(dossierConsignations);
        
    }
});