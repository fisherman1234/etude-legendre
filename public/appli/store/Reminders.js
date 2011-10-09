Ext.define('TP.store.Reminders', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Reminder',
    listeners: {
        write: function(store, record) {
            Ext.getStore('TP.store.RemindersTodays').load();
        }
        

    }
});