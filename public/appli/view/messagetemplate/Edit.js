Ext.define('TP.view.messagetemplate.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.messageTemplateEdit',
    title: "Détails du message",
    width: 1000,
    height: 600,
    autoShow: true,
    bodyStyle: 'padding:15px',
    layout: 'border',
    initComponent: function() {
        this.items = [{
            region: 'center',
            xtype: 'messageTemplateEditForm'
        },
        {
            region: 'east',
            width: 400,          
            split: true,
            xtype: 'messagetemplateAvailableSettings'
        }

        ];
        this.buttons = [
        {
            text: 'Enregistrer',
            action: 'save'
        }];
        this.callParent(arguments);
    }

});