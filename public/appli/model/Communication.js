Ext.define('TP.model.Communication', { //
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/communications', //
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'communication', //
            writeAllFields: false
        }
    },
    fields: ['id', 'sender_id', 'dossier_id', 'subject_id', 'description', 'activite_id', 'message_template_id', 'letter_body', 'is_doc_generated', 'is_sent']
});