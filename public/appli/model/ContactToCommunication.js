Ext.define('TP.model.ContactToCommunication', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/contact_to_communications',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'contact_to_communication',
            writeAllFields: false
        }
    },
    fields: ['id', 'contact_id', 'communication_id', 'transmission_medium_id', 'recipient', 'adresse1', 'adresse2', 'adresse3', 'code_postal', 'pays', 'telephone', 'email', 'fax', 'doc_sent', 'created_at', 'updated_at', 'communication_template_id', 'genre_lettre', 'genre_adresse', 'references_courrier', 'ville', 'final_file_file_name', 'final_file_content_type', 'final_file_file_size', 'final_file_updated_at', 'contact_acteur_id', 'partie']
});

