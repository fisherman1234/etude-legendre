Ext.define('TP.view.communication.DocumentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.communicationDocumentForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'combo',
            fieldLabel: "Document émis par",
            anchor: '96%',
            name: 'sender_id',
            store: 'TP.store.Contacts',
            displayField: 'full_name',
            valueField: 'id',
            hiddenName: 'sender_id',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: false

        }];
        this.callParent(arguments);
    }

});