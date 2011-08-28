Ext.define('TP.controller.Reminders', {
    extend: 'Ext.app.Controller',
    stores: ['Reminders' , 'TP.store.RemindersTodays'],
    models: ['Reminder'],
    views: ['reminder.ReminderForm', 'reminder.EditReminder', 'reminder.RemindersToday'],

    init: function() {
        this.control({
            'reminderShortList tool[action=trigger]': {
                click: this.addReminder
            },
            'reminderEditReminder button[action=cancel]': {
                click: this.cancelReminder
            },
            'reminderEditReminder button[action=save]': {
                click: this.saveReminder
            },
            'reminderEditReminder button[action=delete]': {
                click: this.deleteReminder
            },
            'reminderShortList': {
                itemdblclick: this.editReminder
            }
        });
    },
    addReminder: function() {
        Ext.widget('reminderEditReminder');
    },
    cancelReminder: function(button) {
        remWin = button.up("window");
        remWin.close();
    },
    saveReminder: function(button) {
        remWin = button.up("window");
        form = remWin.items.items[0];
        record = form.getRecord();
        values = form.getValues();
        if (typeof record == 'undefined') {
            record = Ext.ModelManager.create({},
            'TP.model.Reminder');
            Ext.getStore('TP.store.Reminders').insert(0, record);
        }
        record.set(values);

        Ext.getStore('TP.store.Reminders').sync();
        remWin.close();
    },
    deleteReminder: function(button) {
        remWin = button.up("window");
        form = remWin.items.items[0];
        record = form.getRecord();
        if (typeof record != 'undefined') {
            Ext.getStore('TP.store.Reminders').remove(record);
            Ext.getStore('TP.store.Reminders').sync();
        }
        remWin.close();
    },
    editReminder: function(grid, record) {
        remWin = Ext.widget('reminderEditReminder');
        form = remWin.items.items[0];
        form.loadRecord(record);
    }

});