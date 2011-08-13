Ext.define('TP.store.Users', {
    extend: 'Ext.data.Store',
    model: 'TP.model.User',
    autoLoad: true,
    autoSync: true
});