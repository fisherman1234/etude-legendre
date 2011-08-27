Ext.define('TP.view.contacttocommunication.EditContactCommunication', {
    extend: 'Ext.window.Window',
    alias: 'widget.contacttocommunicationEditContactCommunication',
    id: 'contacttocommunicationEditContactCommunication',
    title: "Détails de la communication",
    width: 900,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'hbox',
    closable: false,

    items: [{
        xtype: 'contacttocommunicationListLarge',
        flex: 1
    },
    {
        xtype: 'contactListLarge',
        flex: 1
    }],
    buttons: [{
        text: 'Annuler',
        action: 'cancel',
        id: 'cancelAddConCom',
        hidden: true

    },
    {
        text: 'Enregistrer',
        action: 'saveConCom'

    },
    {
        text: 'Supprimer',
        action: 'deleteConCom',
        hidden: true,
        id: 'delete'

    }]
});