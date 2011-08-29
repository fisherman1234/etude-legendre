Ext.define('TP.view.dossier.FindDossier', {
    extend: 'Ext.window.Window',
    alias: 'widget.dossierFindDossier',
    title: "Recherche d'un dossier",
    width: 800,
    height: 400,
modal: true,
    autoShow: true,
    layout: 'fit',
    closable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'dossierLargeList'
        }];
				this.buttons = [{
            text: 'Fermer',
            action: 'close'

        }];

        this.callParent(arguments);
    }
});