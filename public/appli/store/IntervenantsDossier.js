Ext.define('TP.store.IntervenantsDossier', {
    extend: 'Ext.data.TreeStore',
    model: 'TP.model.Institution',
    autoLoad: true,
    autoSync: true
});