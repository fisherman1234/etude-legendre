Ext.define('TP.view.institution.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.institutionEdit',
    title: 'Détails de la société',
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
            xtype: 'institutionEditForm'
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