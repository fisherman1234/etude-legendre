Ext.define('TP.view.reminder.ReminderForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reminderReminderForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'datefield',
            fieldLabel: "Date",
            anchor: '96%',
            name: 'reminder_date',
            allowBlank: false

        },
        {
            xtype: 'textfield',
            fieldLabel: "Description",
            anchor: '96%',
            name: 'description',
            allowBlank: false
        },
        {
            xtype: 'combo',
            fieldLabel: "Priorité",
            anchor: '96%',
            name: 'priorite',
            store: 'TP.store.Priorites',
            displayField: 'description',
            valueField: 'description',
            hiddenName: 'priorite',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false
        }];
        this.callParent(arguments);
    }

});