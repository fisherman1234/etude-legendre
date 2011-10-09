Ext.define('TP.view.document.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.documentEdit',

    title: "Propriétés du dossier",
    layout: 'fit',
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
                margin: 10,
                allowBlank: false
            },
            {
                xtype: 'filefield',
                name: 'file',

                fieldLabel: 'Fichier',
                msgTarget: 'side',
                buttonText: 'Choisir le fichier...',
                margin: 10,
                allowBlank: false

            },
            {
                xtype: 'combo',
                margin: 10,
                queryMode: 'local',
                fieldLabel: 'Emetteur',
                anchor: '96%',
                name: 'contact_id',
                store: 'TP.store.Contacts',
                displayField: 'nom_complet',
                valueField: 'id',
                hiddenName: 'contact_id',
                forceSelection: true
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
            action: 'delete',
            hidden: true
        }];

        this.callParent(arguments);
    }
});