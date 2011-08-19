Ext.define('TP.view.activite.QuoteForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteQuoteForm',
    layout: 'anchor',
    id: "activiteQuoteForm",
    frame: true,
    border: false,
    items: [{
        xtype: 'textfield',
        fieldLabel: "Description",
        anchor: '96%',
        name: 'description'
    }]
});