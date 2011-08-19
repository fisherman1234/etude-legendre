Ext.define('TP.view.dossier.Contact', {
    extend: 'Ext.Panel',
    alias: 'widget.dossierContact',
    id: "dossierContact",
    title: "Contacts",
		layout: 'border',
    items: [{
				region: 'center',
        xtype: 'acteurTree'
    },
    {
        xtype: 'panel',
				region: 'south',
				height: 300,
				collapsible: true,
				title: "Details",
				resizable: true,
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