Ext.define('TP.model.TypeDocument', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_documents',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_document',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});