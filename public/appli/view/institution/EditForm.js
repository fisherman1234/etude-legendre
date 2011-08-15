Ext.define('TP.view.institution.EditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.institutionEditForm',
    layout: 'fit',
    id: "institutionEditForm",
    items: [{
        xtype: 'form',
        layout: 'anchor',
        items: [{
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout: 'hbox',
            padding: 5,
            defaults: {
                flex: 1,
                margin: '0 5 0 0'
            },
            items: [{
                xtype: 'combo',
                fieldLabel: "Type de société",
                name: 'type_institution_id',
                store: 'TP.store.TypeInstitutions',
                displayField: 'description',
                valueField: 'id',
                hiddenName: 'type_institution_id',
                queryMode: 'local',
                forceSelection: true,
								allowBlank: false
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nom',
                name: 'nom',
								allowBlank: false

            },
            {
                xtype: 'textfield',
                fieldLabel: 'Chambre',
                name: 'chambre'
            }]
        },
        {
            xtype: 'fieldcontainer',
            combineErrors: true,
            layout: 'hbox',
            padding: 5,
            defaults: {
                flex: 1,
                margin: '0 5 0 0'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Téléphone',
                name: 'telephone',
                maskRe: /[0-9 -+.]/,
                emptyText: 'ex. +33.6.72.66.41.90'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Fax',
                name: 'fax',
                maskRe: /[0-9 -+.]/,
                emptyText: 'ex. +33.6.72.66.41.90'
            }]
        },		{
		            xtype: 'fieldcontainer',
		            combineErrors: true,
		            layout: 'hbox',
		            padding: 5,
		            defaults: {
		                flex: 1,
		                margin: '0 5 0 0'
		            },
		            items: [{
				            xtype: 'textfield',
				            fieldLabel: 'Site web',
				            name: 'site_web'

				        }]
		        }
        ]
    }]
});