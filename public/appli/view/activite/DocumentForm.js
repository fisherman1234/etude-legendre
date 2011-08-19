Ext.define('TP.view.activite.DocumentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteDocumentForm',
    layout: 'anchor',
    id: "activiteDocumentForm",
    frame: true,
    border: false,
    items: [{
        xtype: 'textfield',
        fieldLabel: "Sujet des documents",
        anchor: '96%',
        name: 'description'
    }]
});