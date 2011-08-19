Ext.define('TP.controller.Activites', {
    extend: 'Ext.app.Controller',
    stores: ['Activites'],
    models: ['Activite'],
    views: ['activite.List', 'activite.EditCall', 'activite.CallForm'],
    init: function() {
        this.control({
            'activiteList button[action=add_call]': {
                click: this.addCall
            },
            'activiteList button[action=add_quote]': {
                click: this.addCall
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
        communication = Ext.ModelManager.create({},
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

    }

});