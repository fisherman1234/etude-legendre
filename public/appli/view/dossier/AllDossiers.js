Ext.define('TP.view.dossier.AllDossiers', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dossierAllDossiers',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    defaults: {
        // applied to each contained panel
        frame: true
    },

    initComponent: function() {
        this.items = [{
            xtype: 'remindersToday',
            flex: 1
        },
        {
            xtype: 'panel',
            title: 'Répartition des dossiers',
						frame: true,
						flex: 1,
						layout: 'fit',
						padding: 30,
            items: [{
                
                height: 200,
                animate: true,
                xtype: 'chart',
                store: 'TP.store.DossierCounts',
                theme: 'Base:gradients',
                shadow: true,
                series: [{
                    type: 'pie',
                    field: 'recordCount',
                    showInLegend: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 50,
                        renderer: function(storeItem, item) {
                            // calculate and display percentage on hover
                            var total = 0;
                            Ext.getStore('TP.store.DossierCounts').each(function(rec) {
                                total += rec.get('recordCount');
                            });
                            this.setTitle(storeItem.get('description') + ': ' + Math.round(storeItem.get('recordCount') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'description',
                        display: 'rotate',
                        contrast: true,
                        font: '10px Arial'
                    }
                }]
            }]
        }];

        this.callParent(arguments);
    }
});