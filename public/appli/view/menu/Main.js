Ext.define('TP.view.menu.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainMenu',
    id: 'mainMenu',
    border: false,
    tbar: [{
        text: 'Accueil',
        action: 'home',
        icon: '/images/house.png'
    },
    {
        text: 'Dossier',
        icon: '/images/book.png',
        menu: [{
            text: 'Nouveau',
            action: 'newDossier',
            icon: '/images/book_add.png',
            handler: function(el) {
                Ext.widget('dossierNewDossier');
            }
        },
        {
            text: 'Ouvrir',
            action: 'ouvrir_dossier',
            icon: '/images/book_open.png',
            handler: function(el) {
                Ext.widget('dossierFindDossier');
            }

        }]
    },
    {
        text: 'Contacts',
        icon: '/images/user.png',
        menu: [{
            text: 'Nouveau',
            icon: '/images/user_add.png',
            handler: function(el) {
                Ext.widget('contactEdit');
            }
        },
        {
            text: 'Ouvrir',
            icon: '/images/user_go.png',
            handler: function(el) {
                Ext.widget('contactContactList');
            }
        }]
    },
    {
        text: 'Sociétés',
        icon: '/images/building.png',
        menu: [{
            text: 'Nouveau',
            icon: '/images/building_add.png',
            handler: function(el) {
                Ext.widget('institutionEdit');
            }
        },
        {
            text: 'Ouvrir',
            icon: '/images/building_go.png',
            handler: function(el) {
                Ext.widget('institutionFindInstitution');
            }
        }]
    },
    {
        text: 'Options',
        icon: '/images/cog.png',
				handler: function(el){
					Ext.widget('menuSettings');
				}
    }]
});