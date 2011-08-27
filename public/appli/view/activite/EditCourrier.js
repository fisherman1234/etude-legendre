Ext.define('TP.view.activite.EditCourrier', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditCourrier',
    id: 'activiteEditCourrier',
    closable: false,
    title: "Détails du courrier",
    width: 1000,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'border',

    items: [{
        region: 'west',
        width: 200,
        title: 'Destinataires',
        xtype: 'contacttocommunicationListShort' // todo : a créer
    },
    {
        region: 'center',
        layout: 'vbox',
        frame: true,
        width: 550,
        items: [{
            xtype: 'activiteCourrierForm',
            flex: 4,
            width: 540

        },
        {
            xtype: 'communicationCourrierForm',
            flex: 8,
            width: 540

        }]

    },
    {
        region: 'east',
        width: 200,
        xtype: 'documentListShort'
    }],
    buttons: [{
        text: 'Annuler',
        action: 'cancelAddCourrier',
        id: 'cancelAddCourrier',
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