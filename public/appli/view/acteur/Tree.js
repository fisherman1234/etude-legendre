Ext.define('TP.view.acteur.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.acteurTree',
    store: 'TP.store.TreeActeurs',
    id: "acteurTree",
    rootVisible: false,
		sortableColumns: true,

		
    columns: [{
        xtype: 'treecolumn',
        text: 'Nom',
        dataIndex: 'text',
        flex: 2
    },
    {
        text: 'Qualité procédurale',
        dataIndex: 'qualite_procedurale',
        flex: 1
    },
    {
        text: 'Institution',
        dataIndex: 'institution',
        flex: 1
    },
    {
        text: 'Téléphone',
        dataIndex: 'telephone',
        flex: 1
    },
    {
        text: 'Email',
        dataIndex: 'email',
        flex: 1
    },
		{
        xtype: 'actioncolumn',
        width: 30,
        items: [{
            icon: '/images/delete.png',
            tooltip: 'Supprimer',
            handler: function(grid, rowIndex, colIndex) {
                rec = grid.getStore().getAt(rowIndex);
                Ext.Msg.show({
                    title: 'Supprimer cet enregistrement',
                    msg: 'Voulez-vous supprimer cet enregistrement ?',
                    buttons: Ext.Msg.YESNO,
                    fn: function(id) {
                        if (id == "yes") {
														if (rec.data.leaf === true){ // this is a contactacteur
															record = Ext.getStore('TP.store.ContactActeurs').findRecord('id', rec.data.id);
															Ext.getStore('TP.store.ContactActeurs').remove(record);
															Ext.getStore('TP.store.ContactActeurs').sync();
														}else{
															record = Ext.getStore('TP.store.Acteurs').findRecord('id', rec.data.id);
															Ext.getStore('TP.store.Acteurs').remove(record);
															Ext.getStore('TP.store.Acteurs').sync();
														}
                        }
                    },
                    icon: Ext.Msg.QUESTION
                });
            }
        }]
    }]

});