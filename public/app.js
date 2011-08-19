Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'TP',
    appFolder: 'appli',
    title: 'Cabinet Legendre',
    controllers: ['Dossiers', 'Expenses', 'Activites', 'Documents', 'Acteurs', 'ContactActeurs', 'Contacts', 'Institutions', 'QualiteProcedurales', 'Communications'],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            renderTo: document.body,
            id: "main_window",
            items: [{
                region: 'north',
                border: false,
                tbar: [{
                    text: 'Accueil'
                },
                {
                    text: 'Dossier',
                    menu: [{
                        text: 'Nouveau'
                    },
                    {
                        text: 'Ouvrir'
                    }]
                },
                {
                    text: 'Contacts',
                    menu: [{
                        text: 'Nouveau'
                    },
                    {
                        text: 'Ouvrir'
                    }]
                },
                {
                    text: 'Options',
                    menu: []
                }]
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
                //xtype: 'PickContact'
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