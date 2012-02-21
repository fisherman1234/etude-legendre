Ext.define('TP.view.dossier.Summary', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dossierSummary',
    layout: {
        type: 'table',
        // The total column count must be specified here
        columns: 2

    },
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:10px',
        frame: true,
        width: 300,
        height: 200,
        margin: 10
    },
    title: 'Informations',
    store: 'Dossiers',
    tplMarkup: ['<h1>Nom du dossier: {nom_dossier}</h1>', '<h1>Références cabinet: {ref_cabinet}</h1>', '<h2>Etat du dossier: {type_etat_dossier_id:this.renderEtatDossier}</h2>', "</h2>Avis de désignation le: {date_avis_designation:date}</h2>"],
    tplMarkupExport: ['<h1>Export :</h1><a href=/export/contacts?id={id}>Exporter la liste des contacts</a><br/>', '<a href=/export/convocations?id={id}>Exporter la liste des convocations</a><br/>', '<a href=/export/documents?id={id}>Exporter la liste des documents</a><br/><a href=/export/expenses?id={id}>Exporter la liste des dépenses</a>','<br/><br/><a href="javascript: if (confirm(\'Confirmer la suppression ?\')) { window.location.href=\'/dossiers/{id}/destroy\' } else { void(\'\') };">Supprimer ce dossier</a>'],
    startingMarkup: 'Please select a record to see additional details',
    initComponent: function() {
        this.tpl = Ext.create('Ext.Template', this.tplMarkup);
        this.tplExport = Ext.create('Ext.Template', this.tplMarkupExport);
        this.items = [{
            html: this.startingMarkup

        },
        {
            xtype: 'chart',
            animate: {
                easing: 'elasticIn',
                duration: 500
            },

            store: 'TP.store.CurrentDossiers',
            insetPadding: 25,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: Ext.getStore('TP.store.TypeEtatDossiers').count(),
                steps: Ext.getStore('TP.store.TypeEtatDossiers').count(),
                margin: 7,
                title: 'Etat du dossier'
            }],
            series: [{
                type: 'gauge',
                field: 'type_etat_dossier_id',
                donut: false,
                colorSet: ['#F49D10', '#ddd']
            }]

        },
        {
            html: this.startingMarkup

        }];

        this.listeners = {
            render: function(c) {
                Ext.getStore('TP.store.CurrentDossiers').on('datachanged', this.updateDetail, this);
                Ext.getStore('TP.store.CurrentDossiers').on('update', this.updateDetail, this);
                this.tpl.renderEtatDossier = function(value) {
                    return Ext.getStore('TP.store.TypeEtatDossiers').findRecord('id', value).data.description;
                };

            }
        };

        this.callParent(arguments);

    },
    updateDetail: function(data) {
        this.tpl.overwrite(this.items.items[0].body, Ext.getStore('TP.store.CurrentDossiers').getAt(0).data);
        this.tplExport.overwrite(this.items.items[2].body, Ext.getStore('TP.store.CurrentDossiers').getAt(0).data);

    }

});