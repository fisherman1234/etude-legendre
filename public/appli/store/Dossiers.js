Ext.define('TP.store.Dossiers', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Dossier',
    autoLoad: true,
    groupField: 'type_etat_dossier_id',
    listeners: {
        update: function(store, record) {
            Ext.getStore('TP.store.CurrentDossiers').loadRecords([record.copy()]);
            this.updateChart();
						

        },
        load: function(store) {
            this.updateChart();
        },
				write: function(){
					store2 = Ext.getStore('TP.store.TreeActeurs');
          if (typeof(store2.proxy.extraParams.dossier) != 'undefined') {
              store2.load();
          }
				}
    },
    updateChart: function() {
        actistore = Ext.getStore('TP.store.TypeEtatDossiers');
        store = Ext.getStore('TP.store.Dossiers');
        if (actistore.isLoading()) {
            console.log('we wait');
            setTimeout(store.updateChart, 1000);
        } else {

            Ext.getStore('TP.store.DossierCounts').removeAll();
            store.group('type_etat_dossier_id');
            values = store.count(true);
            Ext.Object.each(values, function(key, value, myself) {
                Ext.getStore('TP.store.DossierCounts').insert(0, {
                    recordCount: value,
                    description: actistore.findRecord('id', key).data.description
                });

            });
        }
    }
    //autoSync: true,
    //groupField: 'type_etat_dossier_description'
});