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
    },
		loadEntireDossier: function(dossier_id){
			var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Chargement du dossier..."});
			myMask.show();
			var currentDossierStore = Ext.getStore('TP.store.CurrentDossiers');
			Ext.Ajax.request({
          url: '/dossiers/'+dossier_id+'.json',
          method: 'get',
          success: function(response) {
              resp = Ext.decode(response.responseText);
			        currentDossierStore.loadData([resp.dossier]);
							Ext.getStore('TP.store.Activites').loadData(resp.activites);
							Ext.getStore('TP.store.Expenses').loadData(resp.expenses);
							Ext.getStore('TP.store.Documents').loadData(resp.documents);
							Ext.getStore('TP.store.ContactActeurs').loadData(resp.contact_acteurs);
							Ext.getStore('TP.store.Acteurs').loadData(resp.acteurs);
							Ext.getStore('TP.store.Communications').loadData(resp.communications);
							Ext.getStore('TP.store.TreeActeurs').setRootNode(resp.tree);
							currentDossierStore.fireEvent('dossierFullyLoaded', currentDossierStore.getAt(0));
							myMask.hide();
          }
      });
		},
		setBaseParams: function(dossier_id){
			Ext.getStore('TP.store.Reminders').clearFilter();
      Ext.getStore('TP.store.Reminders').filter("dossier_id", dossier_id);
			Ext.getStore('TP.store.Activites').proxy.extraParams = {
          dossier: dossier_id
      };
			Ext.getStore('TP.store.Activites').proxy.extraParams = {
          dossier: dossier_id
      };
			Ext.getStore('TP.store.Expenses').proxy.extraParams = {
          dossier: dossier_id
      };
			Ext.getStore('TP.store.Reminders').proxy.extraParams = {
          dossier: dossier_id
      };
			Ext.getStore('TP.store.Documents').proxy.extraParams = {
          dossier: dossier_id
      };
			Ext.getStore('TP.store.ContactActeurs').proxy.extraParams = {
          dossier: dossier_id
      };
      Ext.getStore('TP.store.Acteurs').proxy.extraParams = {
          dossier: dossier_id
      };
			Ext.getStore('TP.store.Communications').proxy.extraParams = {
          dossier: dossier_id
      };
			Ext.getStore('TP.store.TreeActeurs').proxy.extraParams = {
          dossier: dossier_id //todo
      };
		}
    //autoSync: true,
    //groupField: 'type_etat_dossier_description'
});