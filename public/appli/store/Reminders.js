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
        datachanged: function(store, record) {
            var records = [];
            var newStore = Ext.getStore('TP.store.RemindersTodays');
            if (store.snapshot) {
                store.snapshot.each(
                function(r) {
                    records.push(r.copy());
                });
            } else {
                store.each(
                function(r) {
                    records.push(r.copy());
                });
            }

            newStore.loadRecords(records);
        }

    }
});