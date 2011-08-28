Ext.define('TP.store.Dossiers', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Dossier',
    autoLoad: true,
		listeners: {
        update: function(store, record) {
							Ext.getStore('TP.store.CurrentDossiers').loadRecords([record]);   
        }
    }
    //autoSync: true,
    //groupField: 'type_etat_dossier_description'
});