Ext.define('TP.view.activite.DocumentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteDocumentForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'textfield',
            fieldLabel: "Sujet des documents",
            anchor: '96%',
            name: 'description',
            allowBlank: false
        }];
        this.callParent(arguments);
    }
});