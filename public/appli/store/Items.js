Ext.define('TP.store.Items', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Item',
    autoLoad: true,
    autoSync: true

});