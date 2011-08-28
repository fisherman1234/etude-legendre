Ext.define('TP.view.reminder.RemindersToday', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.remindersToday',
    title: 'Tous les dossiers',
    store: 'TP.store.RemindersTodays',

    initComponent: function() {

        this.columns = [{
            header: 'Description',
            dataIndex: 'description',
            flex: 1
        },
        {
            header: 'Date',
            dataIndex: 'reminder_date',
            flex: 1
        }];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            displayInfo: true,
            items: [{
                xtype: 'button',
                text: 'Aujourd\'hui',
                action: 'filterToday'
            },
            {
                xtype: 'button',
                text: 'Demain',
                action: 'filterTomorrow'
            },
            {
                xtype: 'button',
                text: 'Cette semaine',
                action: 'filterThisWeek'
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];
        this.callParent(arguments);
    }
});