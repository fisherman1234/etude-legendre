Ext.application({
    name: 'TP',

    appFolder: 'appli',
	title: 'Cabinet Legendre',
	controllers: [
	        'Dossiers', 
			'Institutions', 
			'Settings'
	    ],
	
	
	
    launch: function() {
        Ext.create('Ext.container.Viewport', {
		        layout: 'border',
						renderTo: document.body,
				
		        items: [{
				        region: 'north',
				        border: false,
			            html: '<h1 class="x-panel-header">Page Title</h1>',
				        tbar: [{
						                text: 'New',
						                menu: [{
						                    text: 'Add New X'
						                }, {
						                    text: 'Add New Y'
						                }]
						            }]      
				    }, {
		            region: 'west',
		            collapsible: true,
		            title: 'Navigation',
					xtype: 'dossiershortlist',
		            width: 200
		            // the west region might typically utilize a {@link Ext.tree.TreePanel TreePanel} or a Panel with {@link Ext.layout.container.Accordion Accordion layout}
		        }, {
		            region: 'south',
		            title: 'Title for Panel',
		            collapsible: true,
		            html: 'Information goes here',
		            split: true,
		            height: 100,
		            minHeight: 100,
					xtype: 'institutionlist'
		        }, {
		            region: 'east',
		            title: 'Title for the Grid Panel',
		            collapsible: true,
		            split: true,
		            width: 200
		        }, {
		            region: 'center',
		            xtype: 'tabpanel', // TabPanel itself has no title
		            activeTab: 0,      // First tab active by default
		            items: {
		                title: 'Default Tab',
		                html: 'The first tab\'s content. Others may be added dynamically',
						xtype: 'dossierlist'
		            }
		        }]
		    });

    }
});