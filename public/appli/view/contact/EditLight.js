Ext.define('TP.view.contact.EditLight', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactEditLight',

    title: "Détails du contact",
    layout: 'fit',
    id: "contactEditLight",
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            items: [{
                xtype: 'container',
                padding: 10,
                layout: 'anchor',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Nom',
                    name: 'nom',
                    anchor: '100%'

                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Prénom',
                    name: 'prenom',
                    anchor: '100%'

                }]
            }]
        }];
        this.buttons = [{
            text: 'Enregistrer',
            action: 'save'
        }];

        this.callParent(arguments);
    }
});