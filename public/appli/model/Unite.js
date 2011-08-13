Ext.define('TP.model.Unite', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/unites',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'unite',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});