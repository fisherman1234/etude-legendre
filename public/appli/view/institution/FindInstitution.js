Ext.define('TP.view.institution.FindInstitution', {
    extend: 'Ext.window.Window',
    alias: 'widget.institutionFindInstitution',
    title: "Recherche d'une société",
    width: 800,
    height: 400,
    modal: true,
    autoShow: true,
    layout: 'fit',
    closable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'institutionlist'
        }];
        this.buttons = [{
            text: 'Fermer',
            action: 'close'

        }];

        this.callParent(arguments);
    }
});