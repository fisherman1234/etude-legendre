Ext.define('TP.controller.Dossiers', {
    extend: 'Ext.app.Controller',
	stores: [
	        'Dossiers',
			'TP.store.Institutions'
	    ],
	models: ['Dossier',
			'TP.model.Institution'
		],
    views: [
        'dossier.List',
		'dossier.Edit',
		'dossier.ShortList'
    ],

    init: function() {
        this.control({
            'dossierlist': {
                itemdblclick: this.editDossier
            },
            'dossieredit button[action=save]': {
                click: this.updateDossier
            }
        });
    },


    editDossier: function(grid, record) {
       	var view = Ext.widget('dossieredit');		
        view.down('form').loadRecord(record);    
	},
	
	updateDossier: function(button) {
        var win    = button.up('window'),
	        form   = win.down('form'),
	        record = form.getRecord(),
	        values = form.getValues();

	    record.set(values);
	    win.close();
    }
});

