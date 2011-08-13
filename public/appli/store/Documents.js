Ext.define('TP.store.Documents', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Document',
    //autoLoad: true,
    autoSync: true
});