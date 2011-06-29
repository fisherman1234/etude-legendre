Ext.define('TP.store.Institutions', {
    extend: 'Ext.data.Store',
	storeId: 'institutions',
    
    model: 'TP.model.Institution',
    autoLoad: true,
    autoSync: true
});