Ext.define('TP.view.reminder.ReminderForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.reminderReminderForm',
    layout: 'anchor',
    frame: true,
		border: false,
		initComponent: function() {
		      this.items = [{
	            xtype: 'datefield',
	            fieldLabel: "Date",
	            anchor: '96%',
	            name: 'reminder_date',
	            allowBlank: false

	        },
	        {
	            xtype: 'textfield',
	            fieldLabel: "Description",
	            anchor: '96%',
	            name: 'description',
	            allowBlank: false
	        }];

		      this.callParent(arguments);
		  }
    
});