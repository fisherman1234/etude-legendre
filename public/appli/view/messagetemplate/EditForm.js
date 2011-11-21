Ext.define('TP.view.messagetemplate.EditForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.messageTemplateEditForm',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'textfield',
            fieldLabel: 'Objet du courrier/message',
            anchor: '96%',
            name: 'mail_subject',
            allowBlank: false

        },
        {
            xtype: 'tabpanel',
            activeTab: 0,
            defaults: {
                height: 500,
                padding: 10
            },
            layout: 'fit',
            items: [{
                title: 'Corps du mail',
                items: [{
                    xtype: 'htmleditor',
                    anchor: '96%',
                    name: 'message_body',
                    allowBlank: false,
                    width: 500,
                    resizable: true,
                    height: 400,
                    enableColors: false

                }]
            },
            {
                title: 'Corps de la lettre',
                items: [{
                    xtype: 'htmleditor',
                    anchor: '96%',
                    name: 'letter_body',
                    allowBlank: false,
                    width: 500,
                    resizable: true,
                    height: 400,
                    enableColors: false

                }]
            }]
        }];

        this.callParent(arguments);
    }
});