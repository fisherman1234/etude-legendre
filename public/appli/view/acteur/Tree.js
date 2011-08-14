Ext.define('TP.view.acteur.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.acteurTree',

    store: 'TP.store.TreeActeurs',
    id: "acteurTree",
    collapsible: true,
    useArrows: true,
    rootVisible: false
});