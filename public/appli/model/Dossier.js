Ext.define('TP.model.Dossier', {
    extend: 'Ext.data.Model',
    proxy: {
			type: 'rest',
	        url : '/dossiers',
			format: 'json',
			reader: {
                type: 'json',
				root: 'data',
            },
            writer: {
                type: 'json',
				root: 'dossier',
				writeAllFields: false
            }
		},

	    fields: [{"name":"id","persist":true,"allowBlank":true,"type":"int","defaultValue":null},
	{"name":"nom_dossier","allowBlank":true,"type":"string","defaultValue":null},
	{"name":"ref_cabinet","allowBlank":true,"type":"string","defaultValue":null},
	{"name":"date_decision","allowBlank":true,"type":"date","defaultValue":null,"dateFormat":"c"},
	{"name":"date_avis_designation","allowBlank":true,"type":"date","defaultValue":null,"dateFormat":"c"},
	{"name":"date_cible_depot_rapport","allowBlank":true,"type":"date","defaultValue":null,"dateFormat":"c"},
	{"name":"date_effective_depot_raport","allowBlank":true,"type":"date","defaultValue":null,"dateFormat":"c"},
	{"name":"numero_role_general","allowBlank":true,"type":"string","defaultValue":null},
	{"name":"type_expertise_id","type":"auto"},
	{"name":"type_etat_dossier_id","type":"auto"},
	{"name":"institution_id","type":"int"},
	{"name":"date_debut_op_theorique","allowBlank":true,"type":"date","defaultValue":null,"dateFormat":"c"}
	],
	belongsTo: {type: 'belongsTo', model: 'TP.model.Institution'}
    
});

		
 		