Ext.define('TP.view.communication.CallForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.communicationCallForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'combo',
            fieldLabel: "Correspondant téléphonique",
            anchor: '96%',
            name: 'sender_id',
            store: 'TP.store.Contacts',
            displayField: 'nom_complet',
            valueField: 'id',
            hiddenName: 'sender_id',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Sens de l\'appel',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [{
                boxLabel: 'Appel reçu par le cabinet',
                name: 'inbound',
								inputValue: 1
            },
            {
                boxLabel: 'Appel émis par le cabinet',
                name: 'inbound',
								inputValue: 0
            }]
        },
        {
            xtype: 'textfield',
            fieldLabel: "Objet de l'appel",
            anchor: '96%',
            name: 'subject_id',
            allowBlank: false

        },
        {
            xtype: 'textarea',
            fieldLabel: "Compte-rendu",
            anchor: '96%',
            name: 'description'

        }];

        this.callParent(arguments);
    }

});