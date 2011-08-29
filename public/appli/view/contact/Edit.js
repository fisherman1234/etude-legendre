Ext.define('TP.view.contact.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactEdit',
    id: 'contactEdit',
    title: "Détails du contact",
    width: 900,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    defaults: {
        // applied to each contained panel
        border: false
    },
    initComponent: function() {
        this.items = [{
            xtype: 'contactEditForm'
        }];
        this.buttons = [{
            text: 'Annuler',
            action: 'cancel'

        },{
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