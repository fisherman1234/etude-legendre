Ext.define('TP.model.Activite', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/activites',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'activite',
            writeAllFields: false
        }
    },
    fields: ['id', 'type_activite_id', 'description', 'no_accedit', 'adresse1', 'adresse2', 'adresse3', 'code_postal', 'ville', 'pays', 'heure', 'commentaires', 'is_confidentiel', 'terme_date', 'dossier_id', 'message_template_id', 'add_to_gcal', 'date_visite']
});