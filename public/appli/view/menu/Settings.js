Ext.define('TP.view.menu.Settings', {
    extend: 'Ext.window.Window',
    alias: 'widget.menuSettings',
    title: "Paramètres",
    width: 900,
    height: 400,
    autoShow: true,
    layout: 'border',
    closable: false,
    modal: true,
    initComponent: function() {
        this.items = [{
            xtype: 'settingsList',
            region: 'east',
            width: 200
        },
        {
            layout: 'card',
            region: 'center',
            items: [{
                xtype: 'menuCategories'
            },
            {
                xtype: 'menuItems'
            },
            {
                xtype: 'menuQualiteProcedurales'
            },
            {
                xtype: 'menuTauxTvas'
            },
            {
                xtype: 'menuUnites'
            },
            {
                xtype: 'menuTypeDecisions'
            },
            {
                xtype: 'menuTypeEtatDossiers'
            },
            {
                xtype: 'menuTypeExpertises'
            },
            {
                xtype: 'menuTypeInstitutions'
            },
            {
                xtype: 'menuTypeIntervenants'
            },
            {
                xtype: 'userUserList'
            },
            {
                xtype: 'menuTypeActivites'
            },
            {
                xtype: 'menuTypeCivilitesCorrespondances'
            },
            {
                xtype: 'menuTypeDocuments'
            },
            {
                xtype: 'menuCivilites'
            }]

        }];
        this.buttons = [{
            text: 'Fermer',
            action: 'close'
        }];

        this.callParent(arguments);
    }
});