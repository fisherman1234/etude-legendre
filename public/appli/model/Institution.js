Ext.define('TP.model.Institution', {
    extend: 'Ext.data.Model',
    proxy: {
			type: 'rest',
	        url : '/institutions',
			format: 'json',
			reader: {
                type: 'json',
				root: 'data',
            },
            writer: {
                type: 'json',
				root: 'institution',
				writeAllFields: false
            }
		},
	    fields: ['id','nom', 'chambre', 'telephone', 'fax', 'site_web', 'commentaires', 'type_institution_id']
});

		
