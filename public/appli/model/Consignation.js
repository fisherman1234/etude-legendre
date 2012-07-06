Ext.define('TP.model.Consignation', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/consignations',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data',
		        totalProperty: 'totalSize'

        },
        writer: {
            type: 'json',
            root: 'consignation',
            writeAllFields: false
        }
    },
    fields: ['id', 'activite_id', 'is_private', 'dossier_id', 'user_id', 'contact_id', 'description', 'amount', 'status']
});