Ext.define('TP.view.activite.EditCourrier', {
    extend: 'Ext.window.Window',
    alias: 'widget.activiteEditCourrier',
    closable: false,
    title: "Détails du courrier",
    width: 1000,
    height: 400,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'border',
    initComponent: function() {
        Ext.getStore('TP.store.TypeActivites').clearFilter();
        Ext.getStore('TP.store.TypeActivites').filter('categorie_id', 1);

        this.on('beforeclose', function() {
            Ext.getStore('TP.store.TypeActivites').clearFilter();
            delete Ext.getStore('TP.store.ContactDossiers').proxy.extraParams.dossier;
        });
        this.items = [{
            region: 'west',
            width: 200,
            title: 'Destinataires',
            xtype: 'contacttocommunicationListShort' // todo : a créer
        },
        {
            region: 'center',
            layout: 'vbox',
            frame: true,
            width: 550,
            items: [{
                xtype: 'activiteCourrierForm',
                flex: 4,
                width: 540

            },
            {
                xtype: 'communicationCourrierForm',
                flex: 8,
                width: 540

            }]

        },
        {
            region: 'east',
            width: 200,
            xtype: 'documentListShort'
        }];
        this.buttons = [{
            text: 'Annuler',
            action: 'cancelAddCourrier'

        },
        {
            text: 'Enregistrer',
            action: 'save'

        },
        {
            text: 'Supprimer',
            action: 'delete'

        }];
        this.callParent(arguments);
    }

});