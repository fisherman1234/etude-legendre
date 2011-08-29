Ext.define('TP.view.user.UserForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userUserForm',
    layout: 'anchor',
    frame: true,
		border: false,
		initComponent: function() {
		      this.items = [{
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
			            fieldLabel: "Civilité",
			            anchor: '96%',
			            name: 'civilite',
			            store: 'TP.store.Civilites',
			            displayField: 'description',
			            valueField: 'id',
			            hiddenName: 'civilite',
			            queryMode: 'local',
			            forceSelection: true,
									allowBlank: false


			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: 'Prénom',
			            anchor: '96%',
			            name: 'prenom',
									allowBlank: false

			        },
			        {
			            xtype: 'textfield',
			            fieldLabel: 'Nom',
			            anchor: '96%',
			            name: 'nom',
									allowBlank: false

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
			            xtype: 'combo',
			            fieldLabel: "Fonction",
			            forceSelection: true,
			            anchor: '96%',
			            name: 'type_intervenant_id',
			            store: 'TP.store.TypeIntervenants',
			            //TODO : Créer ce type + store associé
			            displayField: 'description',
			            valueField: 'id',
			            hiddenName: 'type_intervenant_id',
			            queryMode: 'local'

			        }]
			    },
			    {
			        xtype: 'tabpanel',
							height: 200,
			        items: [{
			            title: 'Contact',
			            layout: "anchor",
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
			                    xtype: 'textfield',
			                    fieldLabel: 'Téléphone fixe',
			                    anchor: '96%',
			                    name: 'telephone',
			                    maskRe: /[0-9 -+.]/,
			                    emptyText: 'ex. +33.6.72.66.41.90'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Email',
			                    anchor: '96%',
			                    name: 'email',
													allowBlank:false
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
			                    fieldLabel: 'Civilité enveloppes',
			                    anchor: '96%',
			                    name: 'genre_adresse'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Civilité lettres',
			                    anchor: '96%',
			                    name: 'genre_lettre'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Fax',
			                    anchor: '96%',
			                    name: 'fax',
			                    maskRe: /[0-9 -+.]/,
			                    emptyText: 'ex. +33.6.72.66.41.90'
			                }]
			            }]
			        },
			        {
			            title: "Adresse",
			            items: [{
			                layout: 'anchor',
			                margin: 5,
			                border: false,
			                items: [{
			                    xtype: 'textfield',
			                    fieldLabel: 'Adresse',
			                    anchor: '96%',
			                    name: 'adresse1'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Adresse',
			                    anchor: '96%',
			                    name: 'adresse2'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Adresse',
			                    anchor: '96%',
			                    name: 'adresse3'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Code Postal',
			                    anchor: '96%',
			                    name: 'code_postal'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Ville',
			                    anchor: '96%',
			                    name: 'ville'
			                },
			                {
			                    xtype: 'textfield',
			                    fieldLabel: 'Pays',
			                    anchor: '96%',
			                    name: 'pays'
			                }]
			            }]
			        },
			        {
			            title: "Autres",
			            items: [{
			                layout: 'anchor',
			                margin: 5,
			                border: false,
			                items: [{
			                    xtype: 'textfield',
			                    fieldLabel: 'Site web',
			                    anchor: '96%',
			                    name: 'site_web'
			                },
			                {
			                    fieldLabel: 'Notes',
			                    anchor: '96%',
			                    name: 'signature_lettres',
			                    xtype: 'htmleditor',
			                    enableColors: false,
			                    enableAlignments: false
			                }]
			            }]
			        }]
			    }];

		      this.callParent(arguments);
		  }
    
});