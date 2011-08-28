Ext.define('TP.view.activite.EditCall', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditCall',
    title: "Détails de la communication",
    width: 900,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'vbox',
    closable: false,
    defaults: {
        // applied to each contained panel
        border: false
    },

    initComponent: function() {
        this.items = [{
            xtype: 'activiteCallForm',
            flex: 1,
            width: '100%'
        },
        {
            xtype: 'communicationCallForm',
            flex: 2,
            width: '100%'

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