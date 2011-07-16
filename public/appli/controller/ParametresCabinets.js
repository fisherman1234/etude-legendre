Ext.define('TP.controller.ParametresCabinet', {
    extend: 'Ext.app.Controller',
	stores: [
	        'ParametresCabinet'
	    ],
	models: ['ParametreCabinet'],
    views: [
        'parametrecabinet.Edit'
    ],

    init: function() {
        this.control({
            'viewport > institutionlist': {
                itemdblclick: this.editInstitution
            },
            'institutionedit button[action=save]': {
                click: this.updateInstitution
            }
        });
    },

    editInstitution: function(grid, record) {
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