Ext.define('TP.model.Categorie', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/categories',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data',
		        totalProperty: 'totalSize'

        },
        writer: {
            type: 'json',
            root: 'categorie',
            writeAllFields: false
        }
    },
    fields: ['id', 'description', 'taux_tva_id']
});