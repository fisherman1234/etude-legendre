Ext.define('TP.model.TypeInstitution', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_institutions',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_institution',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});