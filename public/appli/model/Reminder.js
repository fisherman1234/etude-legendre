Ext.define('TP.model.Reminder', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        url: '/reminders',
        format: 'json',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            root: 'reminder',
            writeAllFields: false
        }
    },
    fields: ['id', 'reminder_date', 'description', 'activite_id', 'user_id', 'dossier_id', 'priorite']
});