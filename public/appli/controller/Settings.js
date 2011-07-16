Ext.define('TP.controller.Settings', {
    extend: 'Ext.app.Controller',
	stores: [
	        'Settings'
	    ],
    views: [
        'setting.list'
    ],

    init: function() {
        this.control({
            'viewport > settingList': {
                itemdblclick: this.editSetting
            },
            'institutionedit button[action=save]': {
                click: this.updateInstitution
            }
        });
    },

    editSetting: function(grid, record) {
       	var view = Ext.widget('institutionedit');
        view.down('form').loadRecord(record);    
	},
	
	updateInstitution: function(button) {
        var win    = button.up('window'),
	        form   = win.down('form'),
	        record = form.getRecord(),
	        values = form.getValues();

	    record.set(values);
	    win.close();
    }
});