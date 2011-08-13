Ext.define('TP.model.TypeExpertise', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/type_expertises',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'type_expertise',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});