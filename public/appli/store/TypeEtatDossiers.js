Ext.define('TP.store.TypeEtatDossiers', {
    extend: 'Ext.data.Store',
    model: 'TP.model.TypeEtatDossier',
    autoLoad: true,
    listeners: {
        load: function(store) {
						store.sort('ordre_apparition', 'ASC');
        }
    }
});