Ext.define('TP.view.activite.EditDocument', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditDocument',
    title: "Détails de la communication",
    width: 900,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'border',
    closable: false,
    initComponent: function() {

        this.items = [{
            region: 'center',
            layout: 'vbox',
            width: 550,
            items: [{
                xtype: 'activiteDocumentForm',
                flex: 1,
                width: 550

            },
            {
                xtype: 'communicationDocumentForm',
                flex: 1,
                width: 550

            }]

        },
        {
            region: 'east',
            width: 330,
            xtype: 'documentListShort'
        }];
        this.buttons = [{
            text: 'Annuler',
            action: 'cancelAddDocument',
            id: 'cancelAddDocument'

        },
        {
            text: 'Enregistrer',
            action: 'saveDocument'

        },
        {
            text: 'Supprimer',
            action: 'deleteDocument',
            id: 'delete'

        }];

        this.callParent(arguments);
    }
});