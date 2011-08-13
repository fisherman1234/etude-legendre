Ext.define('TP.store.Dossiers', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Dossier',
    autoLoad: true
    //autoSync: true,
    //groupField: 'type_etat_dossier_description'
});