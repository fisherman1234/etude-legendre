Ext.define('TP.view.document.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.documentEdit',

    title: "Edition d'un fichier",
    layout: 'fit',
    id: "documentEdit",
    autoShow: true,
    width: 500,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            border: false,

            items: [{
                xtype: 'textfield',
                fieldLabel: 'Description',
                name: 'description',
                margin: 10

            },
            {
                xtype: 'filefield',
                name: 'file',

                fieldLabel: 'Fichier',
                msgTarget: 'side',
                allowBlank: false,
                buttonText: 'Choisir le fichier...',
                margin: 10
            }]
        }];

        this.buttons = [{
            text: 'Enregistrer',
            action: 'save'
        },
        {
            text: 'Annuler',
            scope: this,
            handler: this.close
        },
        {
            text: 'Supprimer',
            action: 'save',
            hidden: true,
            id: 'deleteButton'
        }];

        this.callParent(arguments);
    }
});