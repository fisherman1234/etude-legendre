Ext.define('TP.view.reminder.ShortList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.reminderShortList',
		id: 'reminderShortList',
    title: 'Rappels dossiers',
    store: 'TP.store.Reminders',
		
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
        }
        ];
				this.tools=[{
				    type:'plus',
				    tooltip: 'Ajouter un mémo',
						action: 'trigger'

				}];
        this.callParent(arguments);
    }
});