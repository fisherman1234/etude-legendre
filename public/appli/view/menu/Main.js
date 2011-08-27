Ext.define('TP.view.menu.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainMenu',
    id: 'mainMenu',
		border: false,
    tbar: [{
        text: 'Accueil',
				action: 'home'
    },
    {
        text: 'Dossier',
        menu: [{
            text: 'Nouveau',
						action: 'new_dosser'
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
});