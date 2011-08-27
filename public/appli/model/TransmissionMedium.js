Ext.define('TP.model.TransmissionMedium', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/transmission_media',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'user',
            writeAllFields: false
        }
    },
    fields: ['id', 'description']
});