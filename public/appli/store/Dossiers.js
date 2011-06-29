Ext.define('TP.store.Dossiers', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Dossier',
    autoLoad: true,
    autoSync: true,
	storeId: 'TPstoreDossiers',
    groupField: 'institution_id'
});