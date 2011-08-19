Ext.define('TP.view.activite.EditDocument', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditDocument',
    id: 'activiteEditDocument',
    title: "Détails de la communication",
    width: 900,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'border',
    items: [{
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
    }],
    buttons: [{
        text: 'Annuler',
        action: 'cancel',
        id: 'cancelAdd',
        hidden: true

    },
    {
        text: 'Enregistrer',
        action: 'save'

    },
    {
        text: 'Supprimer',
        action: 'delete',
        hidden: true,
        id: 'delete'

    }]
});