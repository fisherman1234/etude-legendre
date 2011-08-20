Ext.define('TP.view.reminder.ShortList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.reminderShortList',
		id: 'reminderShortList',
    title: 'Tous les dossiers',
    store: 'TP.store.Reminders',
		tools:[{
		    type:'plus',
		    tooltip: 'Ajouter un mémo',
		    // hidden:true,
		    handler: function(event, toolEl, panel){
		        // refresh logic
		    }
		}],
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

        this.callParent(arguments);
    }
});