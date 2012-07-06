Ext.define('TP.view.contact.EditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.contactEditForm',
    layout: 'anchor',
    id: "contactEditForm",
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
                name: 'prenom'

            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nom',
                anchor: '96%',
                name: 'nom'

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
                    flex: 1,
                    listeners: {
                        scope: this,
                        'select': function(field, value) {
                            field.up('form').form.setValues({
                                telephone: value[0].data.telephone,
                                fax: value[0].data.fax,
                                email: value[0].data.email,
                                adresse1: value[0].data.adresse1,
                                adresse2: value[0].data.adresse2,
                                adresse3: value[0].data.adresse3,
                                code_postal: value[0].data.code_postal,
                                ville: value[0].data.ville,
                                pays: value[0].data.pays
                            });

                        }
                    }
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
                fieldLabel: 'Avocat au bareau de',
                anchor: '96%',
                name: 'avocat_au_barreau'
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
                        fieldLabel: 'Téléphone portable',
                        anchor: '96%',
                        name: 'portable',
                        maskRe: /[0-9 -+.]/,
                        emptyText: 'ex. +33.6.72.66.41.90'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Fax',
                        anchor: '96%',
                        name: 'fax',
                        maskRe: /[0-9 -+.]/,
                        emptyText: 'ex. +33.6.72.66.41.90'
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
                        fieldLabel: 'Email',
                        anchor: '96%',
                        name: 'email'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: "Civilité enveloppes",
                        forceSelection: false,
                        anchor: '96%',
                        name: 'genre_adresse',
                        store: 'TP.store.TypeCivilitesCorrespondances',
                        //TODO : Créer ce type + store associé
                        displayField: 'description',
                        valueField: 'description',
                        hiddenName: 'genre_adresse',
                        queryMode: 'local'

                    },
                    {
                        xtype: 'combo',
                        fieldLabel: "Civilité Lettre",
                        forceSelection: false,
                        anchor: '96%',
                        name: 'genre_lettre',
                        store: 'TP.store.TypeCivilitesCorrespondances',
                        //TODO : Créer ce type + store associé
                        displayField: 'description',
                        valueField: 'description',
                        hiddenName: 'genre_lettre',
                        queryMode: 'local'

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
                        name: 'notes',
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