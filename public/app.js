Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'TP',
    appFolder: 'appli',
    title: 'Cabinet Legendre',
    controllers: ['Dossiers', 'Expenses', 'Activites', 'Documents', 'Acteurs', 'ContactActeurs', 'Contacts'],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            renderTo: document.body,
						id: "main_window",
            items: [{
                region: 'north',
                border: false,
                html: '<h1 class="x-panel-header">Page Title</h1>',
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
                //items: [],
						    id: 'centerArea',
								layout: 'fit', 
								xtype: 'contactEditForm'

            }]
        });

    }
});