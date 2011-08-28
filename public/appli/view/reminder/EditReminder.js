Ext.define('TP.view.reminder.EditReminder', {
    extend: 'Ext.window.Window',
    alias: 'widget.reminderEditReminder',
    title: "Détails du rappel",
    width: 500,
    height: 200,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'fit',
    closable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'reminderReminderForm'
        }];
				this.buttons = [{
            text: 'Annuler',
            action: 'cancel'

        },
        {
            text: 'Enregistrer',
            action: 'save'

        },
        {
            text: 'Supprimer',
            action: 'delete'

        }];

        this.callParent(arguments);
    }
});