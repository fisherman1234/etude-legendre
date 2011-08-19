Ext.define('TP.controller.Activites', {
    extend: 'Ext.app.Controller',
    stores: ['Activites', 'TP.store.QuoteExpenses', 'TP.store.ActiviteToDocuments'],
    models: ['Activite', 'TP.model.Expense'],
    views: ['activite.List', 'activite.EditCall', 'activite.CallForm', 'activite.Overview', 'activite.EditQuote', 'activite.QuoteForm', 'TP.view.expense.QuoteList', 'TP.view.document.ListShort', 'TP.view.communication.DocumentForm', 'TP.view.communication.DocumentForm', 'activite.EditDocument', 'activite.DocumentForm'],
    init: function() {
        this.control({
            'activiteList button[action=add_call]': {
                click: this.addCall
            },
            'activiteList button[action=add_quote]': {
                click: this.addQuote
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
            }
        });
    },

    addCall: function(button) {
        activite = Ext.ModelManager.create({},
        'TP.model.Activite');
        communication = Ext.ModelManager.create({type_activite_id:20},
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
            comWin.close();
        }
    },
    cancelAddCall: function(button) {
        var comWin = Ext.getCmp('activiteEditCall');
        activiteRecord = Ext.getStore('TP.store.Activites').getAt(0);
        Ext.getStore('TP.store.Activites').remove(activiteRecord);
        Ext.getStore('TP.store.Activites').sync();
        comWin.close();
    },
    deleteCall: function(button) {
        var comWin = Ext.getCmp('activiteEditCall');
        activiteRecord = comWin.items.items[0].getRecord();
        Ext.getStore('TP.store.Activites').remove(activiteRecord);
        Ext.getStore('TP.store.Activites').sync();
        comWin.close();

    },
    addQuote: function(button) {
        activite = Ext.ModelManager.create({type_activite_id:21},
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
        activite = Ext.ModelManager.create({type_activite_id:22},
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
        Ext.getCmp("cancelAdd").show();
        var timer = setInterval(function() {
            activite = Ext.getStore('TP.store.Activites').getAt(0);
            if (!activite.phantom) {
                Ext.getStore('TP.store.ActiviteToDocuments').proxy.extraParams.activite_id = activite.data.id;
                clearInterval(timer);

            }
        },
        200);

    }

});