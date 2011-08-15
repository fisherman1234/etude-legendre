Ext.define('TP.view.contact.EditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.contactEditForm',
    layout: 'fit',
    id: "contactEditForm",
    items: [{
        xtype: 'form',
        layout: 'anchor',
        items: [{
            xtype: 'container',
            padding: 5,
            border: false,
            items: [{
                xtype: 'container',
                layout: 'column',
                items: [{
                    xtype: 'container',
                    layout: 'anchor',
                    columnWidth: 0.33,
                    items: [{
                        xtype: 'combo',
                        fieldLabel: "Civilité",
                        anchor: '96%',
                        name: 'civilite_id',
                        store: 'TP.store.Civilites',
                        displayField: 'description',
                        valueField: 'id',
                        hiddenName: 'civilite_id',
                        queryMode: 'local'

                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Fonction',
                        anchor: '96%',
                        name: 'type_intervenant_id'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'anchor',
                    columnWidth: 0.33,
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Prénom',
                        anchor: '96%',
                        name: 'prenom'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Société',
                        anchor: '96%',
                        name: 'institution_id'
                    }]
                },
                {
                    xtype: 'container',
                    layout: 'anchor',
                    columnWidth: 0.33,
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Nom',
                        anchor: '96%',
                        name: 'nom'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Avocat au bareau de',
                        anchor: '96%',
                        name: 'avocat_au_barreau'
                    }]

                }]
            }]
        },
        {
            xtype: 'tabpanel',
            items: [{
                title: 'Contact',
                items: [{
                    xtype: 'container',
                    layout: 'column',
                    margin: 5,
                    items: [{
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.33,
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
                            fieldLabel: 'Civilité enveloppes',
                            anchor: '96%',
                            name: 'genre_adresse'
                        }]
                    },
                    {
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.33,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Téléphone portable',
                            anchor: '96%',
                            name: 'portable',
														maskRe: /[0-9 -+.]/, 
														emptyText: 'ex. +33.6.72.66.41.90'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Civilité lettres',
                            anchor: '96%',
                            name: 'genre_lettre'
                        }]
                    },
                    {
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.33,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            anchor: '96%',
                            name: 'email'
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
        }]
    }]
});