Ext.define('TP.view.activite.CallForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteCallForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
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

        }];

        this.callParent(arguments);
    }

});