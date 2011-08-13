Ext.define('TP.model.Expense', {
    extend: 'Ext.data.Model',
    belongsTo: 'TP.model.Dossier',

    proxy: {
        type: 'rest',
        url: '/expenses',
        format: 'json',

        reader: {
            type: 'json',
            root: 'data',
		        totalProperty: 'totalSize'

        },
        writer: {
            type: 'json',
            root: 'expense',
            writeAllFields: false
        }
    },
    fields: ['id', 'consignation_id', 'item_id', 'description', 'prix_unitaire', 'quantite', 'date_item', 'taux_tva_id', 'unite_id', 'activite_id', 'categorie_id', 'activite_name', 'total_ttc', 'total_ht']
});