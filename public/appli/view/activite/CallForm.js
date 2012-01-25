Ext.define('TP.view.activite.CallForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.activiteCallForm',
    layout: 'anchor',
    frame: true,
    border: false,
    initComponent: function() {
        this.items = [{
            xtype: 'container',
            layout: 'hbox',

            items: [{
                xtype: 'datefield',
                fieldLabel: "Date",
                anchor: '96%',
                name: 'terme_date',
                allowBlank: false

            },
            {
                xtype: "button",
                margin: '0 0 0 4',
                action: 'set_time_to_now',
                icon: '/images/clock_play.png'
            }]
        },

        {
            xtype: 'timefield',
            fieldLabel: "Heure",
            anchor: '96%',
            title: 'Heure courante',
            name: 'heure',
            allowBlank: false,
            increment: 30

        }];

        this.callParent(arguments);
    }

});