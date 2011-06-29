Ext.define('TP.view.dossier.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.dossieredit',

    title : 'Edit',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'nom_dossier',
                        fieldLabel: 'Nom dossier'
                    },
                    {
                        xtype: 'textfield',
                        name : 'ref_cabinet',
                        fieldLabel: 'Reference Cabinet'
                    },
					{	xtype:'combo',
					    fieldLabel: 'Institution',
					    store: 'TP.store.Institutions',
					    queryMode: 'local',
					    displayField: 'nom',
					    valueField: 'id',
						id: 'institution_id',
						hiddenName : 'institution_id',
						name: 'institution_id',
					}
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Enregistrer',
                action: 'save'
            },
            {
                text: 'Annuler',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});