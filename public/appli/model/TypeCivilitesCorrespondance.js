Ext.define('TP.model.TypeCivilitesCorrespondance', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_civilites_correspondances',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_civilites_correspondance',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});