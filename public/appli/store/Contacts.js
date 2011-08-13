Ext.define('TP.store.Contacts', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Contact',
    autoLoad: true,
    autoSync: true
});