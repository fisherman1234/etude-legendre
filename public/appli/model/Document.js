Ext.define('TP.model.Document', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/documents',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'document',
            writeAllFields: false
        }
    },
    fields: ['id', 'description', 'file', 'file_content_type', 'file_file_name', 'file_file_size', 'short_link', 'long_link', 'contact_id']
});