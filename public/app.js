Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'TP',
    appFolder: 'appli',
    title: 'Cabinet Legendre',
    controllers: ['Dossiers', 'Expenses', 'Activites', 'Documents', 'Acteurs', 'ContactActeurs', 'Contacts', 'Institutions', 'QualiteProcedurales', 'Communications', 'Reminders', 'Menus', 'ContactToCommunications'],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            renderTo: document.body,
            id: "main_window",
            items: [{
                region: 'north',
                border: false,
                xtype: "mainMenu"
            },
            {
                region: 'west',
                collapsible: true,
                title: 'Dossiers',
                width: 200,
                xtype: 'dossiershortlist'
                // the west region might typically utilize a {@link Ext.tree.TreePanel TreePanel} or a Panel with {@link Ext.layout.container.Accordion Accordion layout}
            },
            {
                region: 'center',
                items: [],
                id: 'centerArea',
                layout: 'fit'
                //xtype: 'contacttocommunicationListLarge'
            }]
        });

    }
});

Ext.Ajax.defaultHeaders = {
    'UseXBasic': true
};

Ext.Ajax.on('requestexception', function(conn, response, options, e) {
    // show login window
    if (response.status == 401) {
        window.location = '/login';
    }
});