Ext.define('TP.model.MessageTemplate', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/message_templates',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'message_template',
            writeAllFields: false
        }
    },
    fields: ['id', 'message_body', 'letter_body', 'mail_subject', 'description', 'parametres_cabinet_id']
});