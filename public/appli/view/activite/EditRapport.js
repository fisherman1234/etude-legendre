Ext.define('TP.view.activite.EditRapport', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditRapport',
    title: "Enregistrement d'un rapport/CR",
    width: 900,
    height: 400,
    closable: false,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'border',
    initComponent: function() {
        this.items = [{
            region: 'center',
            xtype: 'activiteRapportForm',
            width: 550
        },
        {
            region: 'east',
            width: 330,
            xtype: 'documentListShort'
        }];
        this.buttons = [{
            text: 'Annuler',
            action: 'cancelAddRapport'

        },
        {
            text: 'Enregistrer',
            action: 'saveRapport'

        },
        {
            text: 'Supprimer',
            action: 'deleteRapport'

        }];

        this.callParent(arguments);
    }
});