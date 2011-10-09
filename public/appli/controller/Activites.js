Ext.define('TP.controller.Activites', {
    extend: 'Ext.app.Controller',
    stores: ['Activites', 'TP.store.ContactDossiers', 'TP.store.TypeActivites', 'TP.store.QuoteExpenses', 'TP.store.ActiviteToDocuments', 'TP.store.ContactToCommunications'],
    models: ['Activite', 'TP.model.Expense'],
    views: ['activite.EditRapport', 'activite.RapportForm', 'activite.EditCourrier', 'activite.CourrierForm', 'TP.view.communication.CourrierForm', 'activite.List', 'activite.EditCall', 'activite.CallForm', 'activite.Overview', 'activite.EditQuote', 'activite.QuoteForm', 'TP.view.expense.QuoteList', 'TP.view.document.ListShort', 'TP.view.communication.DocumentForm', 'TP.view.communication.DocumentForm', 'activite.EditDocument', 'activite.DocumentForm', 'activite.ConvocationForm', 'activite.EditConvocation'],
    init: function() {
        this.control({
            'activiteList button[action=add_call]': {
                click: this.addCall
            },
            'activiteList': {
                itemdblclick: this.editActivite
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
            //Begin EditConvocation
            'activiteEditConvocation button[action=save]': {
                click: this.saveConvocation
            },

            'activiteEditConvocation button[action=cancelAddConvocation]': {
                click: this.cancelAddConvocation
            },
            'activiteEditConvocation button[action=delete]': {
                click: this.deleteConvocation
            },
            //
            'activiteList button[action=add_document]': {
                click: this.addDocument
            },
            'activiteEditQuote button[action=save]': {
                click: this.saveQuote
            },
            'activiteEditQuote button[action=cancel]': {
                click: this.cancelAddQuote
            },
            'activiteEditQuote button[action=delete]': {
                click: this.deleteQuote
            },
            'expenseQuoteList button[action=downloadQuote]': {
                click: this.downloadQuote
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
            'activiteEditCourrier button[action=delete]': {
                click: this.deleteCourrier
            },
            'activiteEditDocument button[action=cancelAddDocument]': {
                click: this.cancelAddDocument
            },
            'activiteEditDocument button[action=deleteDocument]': {
                click: this.deleteDocument
            },
            'activiteEditDocument button[action=saveDocument]': {
                click: this.saveDocument
            },
            'activiteList button[action=add_report]': {
                click: this.addReport
            },
            'activiteEditRapport button[action=cancelAddRapport]': {
                click: this.cancelAddRapport
            },
            'activiteEditRapport button[action=saveRapport]': {
                click: this.saveRapport
            },
            'activiteEditRapport button[action=deleteRapport]': {
                click: this.deleteRapport
            }

        });
    },

    addCall: function(button) {
        activite = Ext.ModelManager.create({
            type_activite_id: 20
        },
        'TP.model.Activite');

        Ext.getStore('TP.store.Activites').insert(0, activite);
        Ext.getStore('TP.store.Activites').sync();
        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                var comWin = Ext.getCmp('activiteEditCall');
                Ext.getStore('TP.store.Communications').proxy.extraParams.activite_id = activite.data.id;
                clearInterval(timer);
            }
        },
        200);
        var comWin = Ext.widget('activiteEditCall');
    },
    saveCall: function(button) {
        var comWin = button.up('window');

        formActivite = comWin.items.items[0];
        formCommunication = comWin.items.items[1];

        if (formActivite.form.isValid() && formCommunication.form.isValid()) {
            activiteRecord = comWin.items.items[0].getRecord();
            communicationRecord = comWin.items.items[1].getRecord();
            activiteValues = comWin.items.items[0].getValues();
            communicationValues = comWin.items.items[1].getValues();
            if (typeof activiteRecord == "undefined") { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }
            activiteRecord.set(activiteValues);
            activiteRecord.set('description', communicationValues.subject_id);

            Ext.getStore('TP.store.Activites').sync();

            if (typeof communicationRecord == "undefined") { // this is a new com
                communicationRecord = Ext.ModelManager.create({},
                'TP.model.Communication');
                Ext.getStore('TP.store.Communications').insert(0, communicationRecord);
            }
            communicationRecord.set(communicationValues);
            Ext.getStore('TP.store.Communications').sync();
            comWin.close();
        }
    },
    editCall: function(record) {
        comWin = Ext.widget('activiteEditCall');
        formActivite = comWin.items.items[0];
        formCommunication = comWin.items.items[1];
        formActivite.loadRecord(record);
        comRecord = Ext.getStore('TP.store.Communications').findRecord('activite_id', record.data.id);
        formCommunication.loadRecord(comRecord);
    },
    cancelAddCall: function(button) {
        comWin = button.up('window');
        activiteRecord = comWin.items.items[0].getRecord();
        if (typeof activiteRecord == "undefined") { // this is a new com
            activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            Ext.getStore('TP.store.Activites').remove(activiteRecord);
            Ext.getStore('TP.store.Activites').sync();
        }
        comWin.close();
    },
    deleteCall: function(button) {
        comWin = button.up('window');
        activiteRecord = comWin.items.items[0].getRecord();
        if (typeof activiteRecord == "undefined") { // this is a new com
            activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);

        }
        Ext.getStore('TP.store.Activites').remove(activiteRecord);
        Ext.getStore('TP.store.Activites').sync();
        comWin.close();
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

        comWin = Ext.widget('activiteEditQuote');

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
        if (this.sendQuote(button)) {
            delete Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.activite_id;
            comWin.hide();
        }

    },
    sendQuote: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0];

        if (formActivite.form.isValid()) {
            activiteRecord = comWin.items.items[0].getRecord();
            activiteValues = comWin.items.items[0].getValues();

            if (typeof activiteRecord == "undefined") { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }

            activiteRecord.set(activiteValues);
            Ext.getStore('TP.store.Activites').sync();

            activite_id = Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.activite_id;
            newRecords = Ext.getStore('TP.store.QuoteExpenses').getNewRecords();

            Ext.each(newRecords, function(record, index) {
                record.set('activite_id', activite_id);
            });

            Ext.getStore('TP.store.QuoteExpenses').sync();

            //delete Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.activite_id;
            Ext.getStore('TP.store.Expenses').load();
            return true;

        } else {
            return false;
        }
    },
    downloadQuote: function(button) {
        if (this.sendQuote(button)) {
            quote_id = Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.activite_id;
            ifrm = document.createElement("IFRAME");
            ifrm.setAttribute("src", "/export/quote?id=" + quote_id);
            document.body.appendChild(ifrm);
        }

    },
    cancelAddQuote: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0];
        activite = formActivite.getRecord();
        if (typeof activite == "undefined") {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            Ext.getStore('TP.store.Activites').remove(activite);
            Ext.getStore('TP.store.Activites').sync();
        }

        comWin.close();
    },
    deleteQuote: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0];
        activite = formActivite.getRecord();
        if (typeof activite == "undefined") {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
        }
        Ext.getStore('TP.store.Activites').remove(activite);
        Ext.getStore('TP.store.Activites').sync();
        comWin.close();
    },
    editQuote: function(record) {
        Ext.getStore('TP.store.QuoteExpenses').proxy.extraParams.activite_id = record.data.id;
        Ext.getStore('TP.store.QuoteExpenses').load();
        comWin = Ext.widget('activiteEditQuote');
        formActivite = comWin.items.items[0];
        formActivite.loadRecord(record);
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
        comWin = Ext.widget('activiteEditDocument');

        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = activite.data.id;
                Ext.getStore('TP.store.Communications').proxy.extraParams.activite_id = activite.data.id;
                clearInterval(timer);

            }
        },
        200);

    },
    saveDocument: function(button) {
        var comWin = button.up("window");
        formCommunication = comWin.items.items[0].items.items[1];
        formActivite = comWin.items.items[0].items.items[0];

        if (formCommunication.form.isValid() && formActivite.form.isValid()) {
            communicationRecord = formCommunication.form.getRecord();
            communicationValues = formCommunication.form.getValues();

            if (typeof communicationRecord == "undefined") { // this is a new com
                communicationRecord = Ext.ModelManager.create({},
                'TP.model.Communication');
                Ext.getStore('TP.store.Communications').insert(0, communicationRecord);
            }
            communicationRecord.set(communicationValues);
            Ext.getStore('TP.store.Communications').sync();

            activiteRecord = formActivite.form.getRecord();
            activiteValues = formActivite.form.getValues();
            if (typeof activiteRecord == "undefined") { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }
            activiteRecord.set(activiteValues);
            Ext.getStore('TP.store.Activites').sync();
            comWin.close();
        }
    },
    cancelAddDocument: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0].items.items[0];
        if (typeof formActivite.getRecord() == "undefined") {
            console.log('cancelAddDocument : this is a new record, we delete');
            activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            Ext.getStore('TP.store.Activites').remove(activiteRecord);
            Ext.getStore('TP.store.Activites').sync();
        }
        comWin.close();
    },
    editDocument: function(record) {
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = activite.data.id;
        Ext.getStore('TP.store.ActiviteToDocuments').load();
        comWin = Ext.widget('activiteEditDocument');

        formActivite = comWin.items.items[0].items.items[0];
        formActivite.loadRecord(record);
        comRecord = Ext.getStore('TP.store.Communications').findRecord('activite_id', record.data.id);
        formCom = comWin.items.items[0].items.items[1];
        formCom.loadRecord(comRecord);
    },
    deleteDocument: function(button) {
        comWin = button.up("window");

        formActivite = comWin.items.items[0].items.items[0];
        activite = formActivite.getRecord();
        if (typeof activite == "undefined") {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
        }
        Ext.getStore('TP.store.Activites').remove(activite);
        Ext.getStore('TP.store.Activites').sync();
        comWin.close();
    },
    addConvocation: function() {
        comWin = Ext.widget('activiteEditConvocation');
        comWin.show();

    },
    saveConvocation: function(button) {
        comWin = button.up("window");

        formActivite = comWin.items.items[0];
        values = formActivite.getValues();
        if (formActivite.form.isValid()) {
            activite = formActivite.getRecord();
            if (typeof activite == 'undefined') {
                activite = Ext.ModelManager.create(values, 'TP.model.Activite');
                Ext.getStore('TP.store.Activites').insert(0, activite);

            } else {
                activite.set(values);
            }
            Ext.getStore('TP.store.Activites').sync();
            comWin.close();
        }

    },
    deleteConvocation: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0];
        activite = formActivite.getRecord();
        if (typeof activite != 'undefined') {
            Ext.getStore('TP.store.Activites').remove(activite);
            Ext.getStore('TP.store.Activites').sync();
        }
        comWin.close();
    },
    editConvocation: function(record) {
        comWin = Ext.widget('activiteEditConvocation');
        formActivite = comWin.items.items[0];
        formActivite.loadRecord(record);

    },
    cancelAddConvocation: function(button) {
        comWin = button.up("window");

        comWin.close();
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
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear = 'true';
        Ext.getStore('TP.store.ActiviteToDocuments').load();
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear = 'undefined';
        Ext.getStore('TP.store.ContactToCommunications').proxy.extraParams.clear = 'true';
        Ext.getStore('TP.store.ContactToCommunications').load();
        Ext.getStore('TP.store.ContactToCommunications').proxy.extraParams.clear = 'undefined';

        dossier_id = Ext.getStore('TP.store.Activites').proxy.extraParams.dossier;
        Ext.getStore('TP.store.ContactDossiers').proxy.extraParams.dossier = dossier_id;
        Ext.getStore('TP.store.ContactDossiers').load();

        comWin = Ext.widget('activiteEditCourrier');
    },
    cancelAddCourrier: function(button) {
        comWin = button.up('window');
        activiteForm = comWin.items.items[1].items.items[0];
        activiteRecord = activiteForm.getRecord();
        if (typeof activiteRecord == "undefined") {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            Ext.getStore('TP.store.Activites').remove(activite);
            Ext.getStore('TP.store.Activites').sync();
        }
        comWin.close();
    },
    deleteCourrier: function(button) {
        comWin = button.up('window');
        activiteForm = comWin.items.items[1].items.items[0];
        activiteRecord = activiteForm.getRecord();
        if (typeof activiteRecord == "undefined") {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
        }
        Ext.getStore('TP.store.Activites').remove(activite);
        Ext.getStore('TP.store.Activites').sync();
        comWin.close();
    },
    editCourrier: function(record) {
        communicationRecord = Ext.getStore('TP.store.Communications').findRecord('activite_id', record.data.id);
        comWin = Ext.widget('activiteEditCourrier');

        formCommunication = comWin.items.items[1].items.items[1];
        formActivite = comWin.items.items[1].items.items[0];

        formCommunication.loadRecord(communicationRecord);
        formActivite.loadRecord(record);

        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = record.data.id;
        Ext.getStore('TP.store.ActiviteToDocuments').load();

        Ext.getStore('TP.store.ContactToCommunications').proxy.extraParams.communication_id = communicationRecord.data.id;
        Ext.getStore('TP.store.ContactToCommunications').load();

        dossier_id = Ext.getStore('TP.store.Activites').proxy.extraParams.dossier;
        Ext.getStore('TP.store.ContactDossiers').proxy.extraParams.dossier = dossier_id;
        Ext.getStore('TP.store.ContactDossiers').load();

    },
    saveCourrier: function(button) {
        comWin = button.up('window');

        formCommunication = comWin.items.items[1].items.items[1];
        formActivite = comWin.items.items[1].items.items[0];

        if (formCommunication.form.isValid() && formActivite.form.isValid()) {
            communicationRecord = formCommunication.form.getRecord();
            communicationValues = formCommunication.form.getValues();
            if (typeof communicationRecord == "undefined") { // this is a new com
                communicationRecord = Ext.getStore('TP.store.Communications').getAt(0);
            }
            communicationRecord.set(communicationValues);
            Ext.getStore('TP.store.Communications').sync();

            activiteRecord = formActivite.form.getRecord();
            activiteValues = formActivite.form.getValues();
            if (typeof activiteRecord == "undefined") { // this is a new com
                activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
            }
            activiteRecord.set(activiteValues);
            activiteRecord.set("description", communicationValues.subject_id);
            Ext.getStore('TP.store.Activites').sync();
            comWin.close();
        }
    },
    addReport: function() {
        activite = Ext.ModelManager.create({},
        'TP.model.Activite');
        //Clear the datastore
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear = 'true';
        Ext.getStore('TP.store.ActiviteToDocuments').load();
        delete Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.clear;

        Ext.getStore('TP.store.Activites').insert(0, activite);
        Ext.getStore('TP.store.Activites').sync();
        comWin = Ext.widget('activiteEditRapport');

        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = activite.data.id;
                clearInterval(timer);

            }
        },
        200);
    },
    cancelAddRapport: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0];
        if (typeof formActivite.getRecord() == "undefined") {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            Ext.getStore('TP.store.Activites').remove(activite);
            Ext.getStore('TP.store.Activites').sync();
        }
        comWin.close();
    },
    saveRapport: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0];
        if (formActivite.form.isValid()) {
            activite = formActivite.getRecord();
            activiteValues = formActivite.getValues();
            if (typeof activite == "undefined") {
                activite = Ext.getStore('TP.store.Activites').getAt(0);
            }
            activite.set(activiteValues);
            Ext.getStore('TP.store.Activites').sync();
            comWin.close();
        }

    },
    editRapport: function(record) {
        activite = record;
        Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = activite.data.id;
        Ext.getStore('TP.store.ActiviteToDocuments').load();
        comWin = Ext.widget('activiteEditRapport');
        formActivite = comWin.items.items[0];
        formActivite.loadRecord(activite);
    },
    deleteRapport: function(button) {
        comWin = button.up("window");
        formActivite = comWin.items.items[0];
        if (typeof formActivite.getRecord() == "undefined") {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
        }
        Ext.getStore('TP.store.Activites').remove(activite);
        Ext.getStore('TP.store.Activites').sync();
        comWin.close();
    },
    editActivite: function(grid, record) {
        activite = record;
        context = this;
        Ext.getStore('TP.store.TypeActivites').clearFilter();
        typeActivite = Ext.getStore('TP.store.TypeActivites').findRecord('id', activite.data.type_activite_id);
        categorie_id = typeActivite.data.categorie_id;
        switch (categorie_id) {
        case 1:
            context.editCourrier(record);
            break;
        case 2:
            context.editConvocation(record);
            break;
        case 3:
            context.editRapport(record);
            break;
        case 22:
            context.editDocument(record);
            break;
        case 20:
            context.editCall(record);
            break;
        case 21:
            context.editQuote(record);
            break;
        default:
            //code to be executed if n is different from case 1 and 2
        }
    }

});