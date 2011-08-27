Ext.define('TP.controller.Activites', {
    extend: 'Ext.app.Controller',
    stores: ['Activites', 'TP.store.ContactDossiers', 'TP.store.TypeActivites', 'TP.store.QuoteExpenses', 'TP.store.ActiviteToDocuments', 'TP.store.ContactToCommunications'],
    models: ['Activite', 'TP.model.Expense'],
    views: ['activite.EditCourrier', 'activite.CourrierForm', 'TP.view.communication.CourrierForm', 'activite.List', 'activite.EditCall', 'activite.CallForm', 'activite.Overview', 'activite.EditQuote', 'activite.QuoteForm', 'TP.view.expense.QuoteList', 'TP.view.document.ListShort', 'TP.view.communication.DocumentForm', 'TP.view.communication.DocumentForm', 'activite.EditDocument', 'activite.DocumentForm', 'activite.ConvocationForm', 'activite.EditConvocation'],
    init: function() {
        this.control({
            'activiteList button[action=add_call]': {
                click: this.addCall
            },
            'activiteList button[action=add_quote]': {
                click: this.addQuote
            },
            'activiteList button[action=add_convocation]': {
                click: this.addConvocation
            },
            'activiteList button[action=courrier_add]': {
                click: this.addCourrier
            },

            'activiteEditConvocation button[action=save]': {
                click: this.saveConvocation
            },

            'activiteEditConvocation button[action=cancelAddConvocation]': {
                click: this.cancelAddConvocation
            },

            'activiteList button[action=add_document]': {
                click: this.addDocument
            },
            'activiteEditQuote button[action=save]': {
                click: this.saveQuote
            },
            'activiteEditQuote button[action=cancel]': {
                click: this.cancelAddQuote
            },

            'activiteEditCall button[action=save]': {
                click: this.saveCall
            },
            'activiteEditCall button[action=cancel]': {
                click: this.cancelAddCall
            },
            'activiteEditCall button[action=delete]': {
                click: this.deleteCall
            },
            'activiteEditCourrier button[action=save]': {
                click: this.saveCourrier
            },
            'activiteEditCourrier button[action=cancelAddCourrier]': {
                click: this.cancelAddCourrier
            },
            'activiteEditDocument button[action=cancelAddDocument]': {
                click: this.cancelAddDocument
            },
            'activiteEditDocument button[action=saveDocument]': {
                click: this.saveDocument
            }

        });
    },

    addCall: function(button) {
        activite = Ext.ModelManager.create({},
        'TP.model.Activite');
        communication = Ext.ModelManager.create({
            type_activite_id: 20
        },
        'TP.model.Communication');
        Ext.getStore('TP.store.Activites').insert(0, activite);
        Ext.getStore('TP.store.Activites').sync();
        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                var comWin = Ext.getCmp('activiteEditCall');
                comWin.activite_id = activite.data.id;
                clearInterval(timer);
            }
        },
        200);
        var comWin = Ext.widget('activiteEditCall');
        comWin.items.items[0].loadRecord(activite);
        comWin.items.items[1].loadRecord(communication);
        Ext.getCmp("cancelAdd").show();

    },
    saveCall: function(button) {
        var comWin = Ext.getCmp('activiteEditCall');
        formActivite = comWin.items.items[0];
        formCommunication = comWin.items.items[1];

        if (formActivite.form.isValid() && formCommunication.form.isValid()) {
            activiteRecord = comWin.items.items[0].getRecord();
            communicationRecord = comWin.items.items[1].getRecord();
            activiteValues = comWin.items.items[0].getValues();
            communicationValues = comWin.items.items[1].getValues();

            if (activiteRecord.phantom) { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }
            activiteRecord.set(activiteValues);
            activiteValues.description = communicationValues.subject_id;

            Ext.getStore('TP.store.Activites').sync();

            if (communicationRecord.phantom) { // this is a new com
                communicationValues.activite_id = comWin.activite_id;
                communicationRecord = Ext.ModelManager.create(communicationValues, 'TP.model.Communication');
                activiteRecord.set('activite_id', comWin.activite_id);
                Ext.getStore('TP.store.Communications').insert(0, communicationRecord);
            }
            Ext.getStore('TP.store.Communications').sync();
            comWin.hide();
        }
    },
    cancelAddCall: function(button) {
        var comWin = Ext.getCmp('activiteEditCall');
        activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
        Ext.getStore('TP.store.Activites').remove(activiteRecord);
        Ext.getStore('TP.store.Activites').sync();
        comWin.hide();
    },
    deleteCall: function(button) {
        var comWin = Ext.getCmp('activiteEditCall');
        activiteRecord = comWin.items.items[0].getRecord();
        Ext.getStore('TP.store.Activites').remove(activiteRecord);
        Ext.getStore('TP.store.Activites').sync();
        comWin.hide();

    },
    addQuote: function(button) {
        activite = Ext.ModelManager.create({
            type_activite_id: 21
        },
        'TP.model.Activite');

        //Clear the datastore
        Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.clear = 'true';
        Ext.getStore('TP.store.QuoteExpenses').load();
        Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.clear = 'undefined';

        Ext.getStore('TP.store.Activites').insert(0, activite);
        Ext.getStore('TP.store.Activites').sync();

        var comWin = Ext.getCmp('activiteEditQuote');
        if (typeof(comWin) == 'undefined') {
            comWin = Ext.widget('activiteEditQuote');
        }
        comWin.show();
        comWin.items.items[0].loadRecord(activite);
        Ext.getCmp("cancelAdd").show();

        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.activite_id = activite.data.id;
                clearInterval(timer);

            }
        },
        200);
    },
    saveQuote: function(button) {
        var comWin = Ext.getCmp('activiteEditQuote');
        formActivite = comWin.items.items[0];

        if (formActivite.form.isValid()) {
            activiteRecord = comWin.items.items[0].getRecord();
            activiteValues = comWin.items.items[0].getValues();

            if (activiteRecord.phantom) { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }

            activiteRecord.set(activiteValues);
            Ext.getStore('TP.store.Activites').sync();
            Ext.getStore('TP.store.QuoteExpenses').sync();
            Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.activite_id = "undefined";
            Ext.getStore('TP.store.Expenses').load();
            comWin.hide();
        }
    },
    cancelAddQuote: function(button) {
        var comWin = Ext.getCmp('activiteEditQuote');
        activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
        Ext.getStore('TP.store.Activites').remove(activiteRecord);
        Ext.getStore('TP.store.Activites').sync();
        comWin.hide();
    },
    addDocument: function(button) {
        activite = Ext.ModelManager.create({
            type_activite_id: 22
        },
        'TP.model.Activite');
        //Clear the datastore
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear = 'true';
        Ext.getStore('TP.store.ActiviteToDocuments').load();
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear = 'undefined';

        Ext.getStore('TP.store.Activites').insert(0, activite);
        Ext.getStore('TP.store.Activites').sync();
        var comWin = Ext.getCmp('activiteEditDocument');
        if (typeof(comWin) == 'undefined') {
            comWin = Ext.widget('activiteEditDocument');
        }
        comWin.show();
        Ext.getCmp("activiteEditDocument").down("form").loadRecord(activite);
        Ext.getCmp("cancelAddDocument").show();
        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = activite.data.id;
                clearInterval(timer);

            }
        },
        200);

    },
    saveDocument: function() {
        var comWin = Ext.getCmp('activiteEditDocument');
        formCommunication = Ext.getCmp('communicationDocumentForm');
        formActivite = Ext.getCmp('activiteDocumentForm');

        if (formCommunication.form.isValid() && formActivite.form.isValid()) {
            communicationRecord = formCommunication.form.getRecord();
            communicationValues = formCommunication.form.getValues();
            if (typeof communicationRecord == "undefined" || communicationRecord.phantom) { // this is a new com
                communicationRecord = Ext.getStore('TP.store.Communications').getAt(0);
            }
            communicationRecord.set(communicationValues);
            Ext.getStore('TP.store.Communications').sync();

            activiteRecord = formActivite.form.getRecord();
            activiteValues = formActivite.form.getValues();
            if (typeof activiteRecord == "undefined" || activiteRecord.phantom) { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }
            activiteRecord.set(activiteValues);
            Ext.getStore('TP.store.Activites').sync();
            comWin.hide();
        }
    },
    cancelAddDocument: function() {
        var comWin = Ext.getCmp('activiteEditDocument');
        activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
        Ext.getStore('TP.store.Activites').remove(activiteRecord);
        Ext.getStore('TP.store.Activites').sync();
        comWin.hide();
    },
    addConvocation: function() {
        Ext.getStore('TP.store.TypeActivites').filter('categorie_id', 2);
        var comWin = Ext.getCmp('activiteEditConvocation');
        if (typeof(comWin) == 'undefined') {
            comWin = Ext.widget('activiteEditConvocation');
        }
        Ext.getCmp("cancelAddConvocation").show();
        comWin.show();

    },
    saveConvocation: function() {
        Ext.getStore('TP.store.TypeActivites').clearFilter();
        comWin = Ext.getCmp('activiteEditConvocation');
        formActivite = Ext.getCmp('activiteConvocationForm');
        values = formActivite.getValues();
        if (formActivite.form.isValid()) {
            activite = formActivite.getRecord();
            if (typeof record == 'undefined') {
                activite = Ext.ModelManager.create(values, 'TP.model.Activite');
                Ext.getStore('TP.store.Activites').insert(0, activite);

            } else {
                activite.set(values);
            }
            Ext.getStore('TP.store.Activites').sync();
            comWin.hide();
        }

    },
    cancelAddConvocation: function() {
        Ext.getStore('TP.store.TypeActivites').clearFilter();
        comWin = Ext.getCmp('activiteEditConvocation');
        comWin.hide();
    },
    addCourrier: function() {
        activite = Ext.ModelManager.create({},
        'TP.model.Activite');
        Ext.getStore('TP.store.Activites').insert(0, activite);
        Ext.getStore('TP.store.Activites').sync();
        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = activite.data.id;
                // Crée pour un ID
                communication = Ext.ModelManager.create({},
                'TP.model.Communication');

                Ext.getStore('TP.store.Communications').proxy.extraParams.activite_id = activite.data.id;
                Ext.getStore('TP.store.Communications').insert(0, communication);
                Ext.getStore('TP.store.Communications').sync();
                var timer2 = setInterval(function() {
                    communication = Ext.getStore('TP.store.Communications').getAt(0);
                    if (!communication.phantom) {
                        Ext.getStore('TP.store.ContactToCommunications').proxy.extraParams.communication_id = communication.data.id;
                        clearInterval(timer2);

                    }
                },
                200);
                //
                clearInterval(timer);

            }
        },
        200);
        //
        //Clear the datastores & prepares silots to store associated records
        Ext.getStore('TP.store.TypeActivites').filter('categorie_id', 1);

        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear = 'true';
        Ext.getStore('TP.store.ActiviteToDocuments').load();
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear = 'undefined';
        Ext.getStore('TP.store.ContactToCommunications').proxy.extraParams.clear = 'true';
        Ext.getStore('TP.store.ContactToCommunications').load();
        Ext.getStore('TP.store.ContactToCommunications').proxy.extraParams.clear = 'undefined';

        dossier_id = Ext.getStore('TP.store.Activites').proxy.extraParams.dossier;
        Ext.getStore('TP.store.ContactDossiers').proxy.extraParams.dossier = dossier_id; //  a supprimer ensuite
        Ext.getStore('TP.store.ContactDossiers').load();

        var comWin = Ext.getCmp('activiteEditCourrier');
        if (typeof(comWin) == 'undefined') {
            comWin = Ext.widget('activiteEditCourrier');
        }
        Ext.getCmp("cancelAddCourrier").show();

        comWin.show();
    },
    cancelAddCourrier: function() {
        activite = Ext.getStore('TP.store.Activites').getAt(0);
        Ext.getStore('TP.store.Activites').remove(activite);
        Ext.getStore('TP.store.Activites').sync(); //todo : faire les suppressions en cascade coté serveur
        var comWin = Ext.getCmp('activiteEditCourrier');
        Ext.getStore('TP.store.TypeActivites').clearFilter();
        comWin.hide();
    },
    saveCourrier: function() {

        var comWin = Ext.getCmp('activiteEditCourrier');
        formCommunication = Ext.getCmp('communicationCourrierForm');
        formActivite = Ext.getCmp('activiteCourrierForm');

        if (formCommunication.form.isValid() && formActivite.form.isValid()) {
            communicationRecord = formCommunication.form.getRecord();
            communicationValues = formCommunication.form.getValues();
            if (typeof communicationRecord == "undefined" || communicationRecord.phantom) { // this is a new com
                communicationRecord = Ext.getStore('TP.store.Communications').getAt(0);
            }
            communicationRecord.set(communicationValues);
            Ext.getStore('TP.store.Communications').sync();

            activiteRecord = formActivite.form.getRecord();
            activiteValues = formActivite.form.getValues();
            if (typeof activiteRecord == "undefined" || activiteRecord.phantom) { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }
            activiteRecord.set(activiteValues);
            activiteRecord.set("description", communicationValues.description);
            Ext.getStore('TP.store.Activites').sync();
            Ext.getStore('TP.store.TypeActivites').clearFilter();
            comWin.hide();
        }
    }

});