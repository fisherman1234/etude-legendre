Ext.define('TP.view.activite.CourrierForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteCourrierForm',
    layout: 'anchor',

    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'combo',
            fieldLabel: "Type de courrier",
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
                'select': {
                    fn: function(combobox, records) {
                        var msgId = records[0].data.message_template_id;
                        if (msgId !== null) {
                            var messageTemplate = Ext.getStore('TP.store.MessageTemplates').findRecord('id', msgId);
                            if (messageTemplate !== null) {
                                var formCom = combobox.up('window').items.items[1].items.items[1];
                                formCom.items.items[0].setValue(messageTemplate.data.mail_subject);
                                formCom.items.items[1].setValue(messageTemplate.data.message_body);
                                formCom.items.items[2].setValue(messageTemplate.data.letter_body);
                            }

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
                xtype: 'datefield',
                fieldLabel: "Date",
                anchor: '96%',
                name: 'terme_date',
                allowBlank: false

            },
            {
                xtype: 'timefield',
                fieldLabel: "Heure",
                anchor: '96%',
                name: 'heure',
                allowBlank: false,
                increment: 30

            },
            {
                xtype: "button",
                margin: '0 0 0 4',
                flex: 0.1,
                action: 'set_time_to_now',
                icon: '/images/clock_play.png'
            }]
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Adresse',
            defaultType: 'checkboxfield',
            items: [
                {
                    boxLabel  : 'Imprimer l\'adresse de correspondance',
                    name      : 'stamp',
                    inputValue: '1',
                    id        : 'checkbox1'
                }]
        },
        {
            xtype: 'button',
            // c'est le même que d'utiliser "new Ext.Button()" (voir doc)
            text: 'Ajouter un rappel',
            handler: function() {
                Ext.widget('reminderEditReminder');
            }
        }];

        this.callParent(arguments);
    }

});