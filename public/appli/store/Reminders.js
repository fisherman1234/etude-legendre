Ext.define('TP.store.Reminders', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Reminder',
    autoLoad: true,
    listeners: {
        load: function(store, record) {
            var records = [];
            var newStore = Ext.getStore('TP.store.RemindersTodays');
            store.each(
            function(r) {
                records.push(r.copy());
            });

            newStore.loadRecords(records);
        },
        add: function(store, record) {
            var newStore = Ext.getStore('TP.store.RemindersTodays');

            index = store.data.getKeys(record);
            newStore.insert(index, record);
        },
        update: function(store, record) {
            var newStore = Ext.getStore('TP.store.RemindersTodays');
            index = store.data.getKeys(record);
            recordBis = newStore.getAt(index);
            recordBis.set(record);
        },
        remove: function(store, record) {
            var newStore = Ext.getStore('TP.store.RemindersTodays');
            recordBis = newStore.findRecord('id', record.data.id);
            recordBis.set(record);
        }
    }
});