Ext.define('TP.view.dossier.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dossierlist',

    title : 'Tous les dossiers',
	store: 'Dossiers',
    initComponent: function() {
        

        this.columns = [
            {header: 'Nom',  dataIndex: 'nom_dossier',  flex: 1},
            {header: 'Reference Cabinet', dataIndex: 'ref_cabinet', flex: 1},
			{header: 'Juridiction', dataIndex: 'institution_id', flex: 1},
			{header: 'Avis de désignation', dataIndex: 'date_avis_designation', flex: 1},
			{header: 'Date rapport cible', dataIndex: 'date_cible_depot_rapport', flex: 1}
            
        ];

        this.callParent(arguments);
    }
});