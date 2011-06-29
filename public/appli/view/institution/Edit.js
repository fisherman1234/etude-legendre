Ext.define('TP.view.institution.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.institutionedit',

    title : 'Edit',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'nom',
                        fieldLabel: 'Nom'
                    },
                    {
                        xtype: 'textfield',
                        name : 'chambre',
                        fieldLabel: 'Chambre'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Enregistrer',
                action: 'save'
            },
            {
                text: 'Annuler',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});