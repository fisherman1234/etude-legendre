Ext.define('TP.controller.Reminders', {
    extend: 'Ext.app.Controller',
    stores: ['Reminders', 'TP.store.RemindersTodays'],
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
            },
            'remindersToday': {
                itemdblclick: this.editDossier
            },
            'remindersToday button[action=filterToday]': {
                click: this.filterToday
            },
            'remindersToday button[action=filterTomorrow]': {
                click: this.filterTomorrow
            },
            'remindersToday button[action=filterThisWeek]': {
                click: this.filterThisWeek
            },
            'remindersToday button[action=filterAll]': {
                click: this.filterAll
            }
        });
    },
    filterToday: function(button) {
        store = Ext.getStore('TP.store.RemindersTodays');
        store.clearFilter();
        store.filterBy(function myfilter(record) {
            date = Ext.Date.parse(record.data.reminder_date, 'Y-m-d');
            today = new Date();
            return date == today;
        });
    },
    filterTomorrow: function() {
        store = Ext.getStore('TP.store.RemindersTodays');
        store.clearFilter();
        store.filterBy(function myfilter(record) {
            date = Ext.Date.parse(record.data.reminder_date, 'Y-m-d');
            today = new Date();
            tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return date <= tomorrow && date > today;
        });
    },
    filterThisWeek: function() {
        store = Ext.getStore('TP.store.RemindersTodays');
        store.clearFilter();
        store.filterBy(function myfilter(record) {
            date = Ext.Date.parse(record.data.reminder_date, 'Y-m-d');
            today = new Date();
            week = new Date();
            week.setDate(week.getDate() + 7);
            return date <= week && date > today;
        });
    },
    filterAll: function() {
        store = Ext.getStore('TP.store.RemindersTodays');
        store.clearFilter();
    },
    editDossier: function(grid, record) {
        dossier = Ext.getStore('TP.store.Dossiers').findRecord('id', record.data.dossier_id);
        if (dossier !== null) {
            this.getController('TP.controller.Dossiers').editDossier(null, dossier);
        }
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