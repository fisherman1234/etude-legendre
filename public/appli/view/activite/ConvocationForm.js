Ext.define('TP.view.activite.ConvocationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteConvocationForm',
    layout: 'anchor',
    frame: true,
    padding: 5,

    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'combo',
            fieldLabel: "Type de convocation",
            anchor: '96%',
            name: 'type_activite_id',
            store: 'TP.store.TypeActivites',
            displayField: 'description',
            valueField: 'id',
            hiddenName: 'type_activite_id',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false,
            triggerAction: 'all',
            lastQuery: '',
            listeners: {
                change: {
                    fn: function(field, newValue, oldValue) {
                        if (newValue == 5) {
                            this.up('form').items.items[1].items.items[1].disable();
                        } else {
                            this.up('form').items.items[1].items.items[1].enable();
                        }
                    }
                }
            }

        },
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            anchor: '96%',

            items: [{
                xtype: 'textfield',
                fieldLabel: "Description",
                name: 'description',
                allowBlank: false,
                flex: 1,
                margin: '0 5 0 0'

            },
            {
                xtype: 'numberfield',
                fieldLabel: "No Accedit",
                name: 'no_accedit',
                flex: 1
            }]
        },
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            anchor: '96%',
            items: [{
                xtype: 'datefield',
                fieldLabel: "Date",
                name: 'terme_date',
                flex: 1,
                margin: '0 5 0 0'

            },
            {
                xtype: 'timefield',
                fieldLabel: "Heure",
                name: 'heure',
                flex: 1
            }]
        },
        {
            xtype: 'fieldset',
            padding: 5,
            title: 'Adresse de la convocation',
            anchor: '96%',
            items: [
            {
                xtype: 'container',
                layout: 'hbox',
                anchor: '96%',

                items: [{
                    xtype: "button",
                    margin: '0 4 0 0',
                    action: 'set_place_to_dossier_adress',
                    icon: '/images/house_go.png',
                    tooltip: 'Choisir l\'adresse du dossier'
                },{
                    xtype: 'textfield',
                    fieldLabel: "Adresse 1",
                    name: 'adresse1',
                    flex: 1
                }]
            },
            {
                xtype: 'textfield',
                fieldLabel: "Adresse 2",
                anchor: '96%',
                name: 'adresse2'
            },
            {
                xtype: 'textfield',
                fieldLabel: "Adresse 3",
                anchor: '96%',
                name: 'adresse3'
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                defaults: {
                    flex: 1
                },
                anchor: '96%',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: "Code postal",
                    name: 'code_postal',
                    flex: 1,
                    margin: '0 5 0 0'

                },
                {
                    xtype: 'textfield',
                    fieldLabel: "Ville",
                    name: 'ville',
                    flex: 1
                }]
            }]
        }];
        this.callParent(arguments);
    }

});