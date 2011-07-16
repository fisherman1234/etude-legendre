Ext.define('TP.model.ParametresCabinets', {
    extend: 'Ext.data.Model',
    proxy: {
			type: 'rest',
	        url : '/parametres_cabinets',
			format: 'json',
			reader: {
                type: 'json',
				root: 'data',
            },
            writer: {
                type: 'json',
				root: 'parametre_cabinet',
				writeAllFields: false
            }
		},

	    fields: []
    
});

		
