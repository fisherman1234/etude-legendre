Ext.define('TP.store.ParametresCabinets', {
    extend: 'Ext.data.Store',
		fields: ['id'],
    autoSync: true,
    loadCabData: function() {
        var myMask = new Ext.LoadMask(Ext.getBody(), {
            msg: "Chargement de l'application..."
        });
        myMask.show();
        Ext.Ajax.request({
            url: '/parametres_cabinets/1.json',
            method: 'get',
            success: function(response) {
                resp = Ext.decode(response.responseText);
                Ext.getStore('TP.store.ParametresCabinets').loadData(resp.parametres_cabinet);
                Ext.getStore('TP.store.TauxTvas').loadData(resp.taux_tvas);
                Ext.getStore('TP.store.TypeActivites').loadData(resp.type_activites);
                Ext.getStore('TP.store.Institutions').loadData(resp.institutions);
                Ext.getStore('TP.store.Unites').loadData(resp.unites);
                Ext.getStore('TP.store.Contacts').loadData(resp.contacts);
                Ext.getStore('TP.store.TransmissionMediums').loadData(resp.transmission_media);
                Ext.getStore('TP.store.QualiteProcedurales').loadData(resp.qualite_procedurales);
                Ext.getStore('TP.store.Reminders').loadData(resp.reminders);
                Ext.getStore('TP.store.Categories').loadData(resp.categories);
                Ext.getStore('TP.store.TypeDecisions').loadData(resp.type_decisions);
                Ext.getStore('TP.store.TypeEtatDossiers').loadData(resp.type_etat_dossiers);
                Ext.getStore('TP.store.TypeExpertises').loadData(resp.type_expertises);
                Ext.getStore('TP.store.TypeInstitutions').loadData(resp.type_institutions);
                Ext.getStore('TP.store.TypeIntervenants').loadData(resp.type_intervenants);
                Ext.getStore('TP.store.Contacts').loadData(resp.contacts);
                Ext.getStore('TP.store.Items').loadData(resp.items);
                Ext.getStore('TP.store.Dossiers').loadData(resp.dossiers);
                Ext.getStore('TP.store.Dossiers').loadData(resp.dossiers);
                Ext.getStore('TP.store.MessageTemplates').loadData(resp.message_templates);
                Ext.getStore('TP.store.TypeDocuments').loadData(resp.type_documents);
                Ext.getStore('TP.store.TypeCivilitesCorrespondances').loadData(resp.type_civilite_correspondance);


                myMask.hide();
            }
        });
    }

});