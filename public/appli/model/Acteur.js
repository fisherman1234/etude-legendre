Ext.define('TP.model.Acteur', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/acteurs',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data',
		        totalProperty: 'totalSize'

        },
        writer: {
            type: 'json',
            root: 'acteur',
            writeAllFields: false
        }
    },
    fields: ['id', 'type_acteur_id', 'dossier_id', 'description']
});