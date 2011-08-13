Ext.define('TP.model.TypeEtatDossier', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_etat_dossiers',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_etat_dossier',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});