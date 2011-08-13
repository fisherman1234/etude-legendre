Ext.define('TP.model.Item', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/items',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data',
		        totalProperty: 'totalSize'

        },
        writer: {
            type: 'json',
            root: 'activite',
            writeAllFields: false
        }
    },
    fields: ['id', 'description', 'categorie_id', 'prix_unitaire', 'taux_tva_id', 'unite_id']
});