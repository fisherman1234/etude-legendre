Ext.define('TP.view.dossier.NewDossier', {
    extend: 'Ext.window.Window',
    alias: 'widget.dossierNewDossier',
    title: "Nouveau dossier",
    width: 500,
    height: 320,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'fit',
		modal: true,
    closable: false,
    initComponent: function() {
        this.items = [{
            xtype: 'dossierFormDossier'
        }];
				this.buttons = [{
            text: 'Annuler',
            action: 'cancel'

        },
        {
            text: 'Enregistrer',
            action: 'save'

        }];

        this.callParent(arguments);
    }
});