Ext.define('TP.store.Contacts', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Contact',
    listeners: {
        write: function(store, operation) {
						store2 = Ext.getStore('TP.store.TreeActeurs');
            if (typeof(store2.proxy.extraParams.dossier) != 'undefined') {
                console.log('updated');
                store2.load();
            }
        }
    }
});