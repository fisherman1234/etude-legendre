Ext.define('TP.view.contact.EditLight', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactEditLight',

    title: "Détails du contact",
    layout: 'fit',
    id: "contactEditLight",
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            items: [{
                xtype: 'container',
                padding: 10,
                layout: 'anchor',
                items: [{
                    xtype: 'combo',
                    fieldLabel: "Civilité",
                    anchor: '100%',
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
                    fieldLabel: 'Nom',
                    name: 'nom',
                    anchor: '100%'

                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Prénom',
                    name: 'prenom',
                    anchor: '100%'

                },
                {
                    xtype: 'container',
                    layout: 'hbox',

                    items: [{
                        xtype: 'combo',
                        fieldLabel: "Société",
                        forceSelection: true,
                        anchor: '96%',
                        name: 'institution_id',
                        store: 'TP.store.Institutions',
                        displayField: 'nom',
                        valueField: 'id',
                        hiddenName: 'institution_id',
                        queryMode: 'local',
                        flex: 1
                    },
                    {
                        xtype: "button",
                        margin: '0 0 0 4',
                        action: 'add_institution',
                        icon: '/images/building_add.png'
                    }]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Téléphone fixe',
                    anchor: '100%',
                    name: 'telephone',
                    maskRe: /[0-9 -+.]/,
                    emptyText: 'ex. +33.6.72.66.41.90'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Téléphone portable',
                    anchor: '100%',
                    name: 'portable',
                    maskRe: /[0-9 -+.]/,
                    emptyText: 'ex. +33.6.72.66.41.90'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    anchor: '100%',
                    name: 'email'
                }]
            }]
        }];
        this.buttons = [{
            text: 'Plus',
            action: 'more',
						icon: "/images/user_edit.png"
        },{
            text: 'Enregistrer',
            action: 'save',
						icon: "/images/disk.png"

        }
				];

        this.callParent(arguments);
    }
});