Ext.define('TP.store.TypeEtatDossiers', {
    extend: 'Ext.data.Store',
    model: 'TP.model.TypeEtatDossier',
    autoLoad: true,
    autoSync: true,
    listeners: {
        load: function(store) {
						store.sort('ordre_apparition', 'ASC');
        }
    }
});