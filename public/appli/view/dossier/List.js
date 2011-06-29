Ext.define('TP.view.dossier.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dossierlist',

    title : 'Tous les dossiers',
	store: 'Dossiers',
    initComponent: function() {
        

        this.columns = [
            {header: 'Nom',  dataIndex: 'nom_dossier',  flex: 1},
            {header: 'Reference Cabinet', dataIndex: 'ref_cabinet', flex: 1},
			{header: 'Juridiction', dataIndex: 'juridiction_id', flex: 1, renderer: function(value, metaData, record, rowIndex, colIndex, store) {
			           //return store.getById(31).data.nom_dossier;
						Ext.StoreMgr.lookup('TP.store.Institutions').load();
					   return Ext.StoreMgr.lookup('TP.store.Institutions').getById(record.get('institution_id')).data.nom;
			     }},
			{header: 'Avis de désignation', dataIndex: 'date_avis_designation', flex: 1},
			{header: 'Date rapport cible', dataIndex: 'date_cible_depot_rapport', flex: 1}
            
        ];

        this.callParent(arguments);
    }
});