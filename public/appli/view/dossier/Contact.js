Ext.define('TP.view.dossier.Contact', {
    extend: 'Ext.Panel',
    alias: 'widget.dossierContact',
    id: "dossierContact",
    title: "Contacts",
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'acteurTree',
        flex: 2
    },
    {
        xtype: 'panel',
        width: '100%',
        flex: 2,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'contactacteurEdit',
            flex: 2,
            frame: true
        },
        {
            xtype: 'contactEditLight',
            flex: 2,
            frame: true

        }]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        store: 'TP.store.Expenses',
        displayInfo: true,
        items: [{
            xtype: 'button',
            text: 'Ajouter',
            icon: '/images/add.png',
            action: 'add-contact'
        }]
    }]
});