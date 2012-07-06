Ext.define('TP.model.Civilite', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/civilites',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'civilite',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});