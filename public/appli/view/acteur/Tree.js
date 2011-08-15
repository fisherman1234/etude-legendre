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
        flex: 1
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
    }]

});