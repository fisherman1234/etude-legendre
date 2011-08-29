Ext.define('TP.view.reminder.RemindersToday', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.remindersToday',
    title: 'Rappels',
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
                action: 'filterToday',
                icon: '/images/date.png'
            },
            {
                xtype: 'button',
                text: 'Demain',
                action: 'filterTomorrow',
                icon: '/images/date_next.png'
            },
            {
                xtype: 'button',
                text: 'Cette semaine',
                action: 'filterThisWeek',
                icon: '/images/calendar_view_week.png'
            },
            {
                xtype: 'button',
                text: 'Tous',
                action: 'filterAll',
                icon: '/images/calendar.png'
            }],
            layout: 'hbox' // The items are arranged horizontally
        }];
        this.callParent(arguments);
    }
});