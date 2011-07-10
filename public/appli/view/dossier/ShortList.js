Ext.define('TP.view.dossier.ShortList' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dossiershortlist',

    title : 'Tous les dossiers',
	store: 'Dossiers',
    features :  [{ftype:'grouping', groupHeaderTpl : 'Groupe: {Ext.StoreMgr.lookup("TP.store.Institutions").getById(record.get(name)).data.nom}'}],
	
    initComponent: function() {
        
		
        this.columns = [
            {header: 'Nom',  dataIndex: 'nom_dossier',  flex: 1},
			{header: 'Juridiction', dataIndex: 'institution_id', flex: 1, renderer: function(value, metaData, record, rowIndex, colIndex, store) {
			           //return store.getById(31).data.nom_dossier;
					   return Ext.StoreMgr.lookup('TP.store.Institutions').getById(record.get('institution_id')).data.nom;
			     }}
            
        ];

        this.callParent(arguments);
    }
});