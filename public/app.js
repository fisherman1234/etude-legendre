Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'TP',
    appFolder: 'appli',
    title: 'Cabinet Legendre',
    controllers: ['Expenses', 'Activites', 'Documents', 'Acteurs', 'ContactActeurs', 'Contacts', 'Institutions', 'QualiteProcedurales', 'Communications', 'Reminders', 'Menus', 'ContactToCommunications', 'Dossiers', 'MessageTemplates'],

    launch: function() {
        Ext.getStore('TP.store.ParametresCabinets').loadCabData();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            renderTo: document.body,
            id: "main_window",
            items: [{
                region: 'north',
                border: false,
                xtype: "mainMenu"
            },
            {
                region: 'west',
                collapsible: true,
                title: 'Dossiers',
                width: 200,
                xtype: 'dossiershortlist'
                // the west region might typically utilize a {@link Ext.tree.TreePanel TreePanel} or a Panel with {@link Ext.layout.container.Accordion Accordion layout}
            },
            {
                region: 'center',
                items: [{
                    xtype: 'dossierAllDossiers'
                }],
                id: 'centerArea',
                layout: 'card'
                //xtype: 'contacttocommunicationListLarge'
            }]
        });

    }
});

Ext.Ajax.defaultHeaders = {
    'UseXBasic': true
};

Ext.Ajax.on('requestexception', function(conn, response, options, e) {
    // show login window
    if (response.status == 401) {
        window.location = '/login';
    }
});
// fix for internalId and loadData 
Ext.ModelManager.create = function(config, name, id) {
    var con = (typeof name == 'function') ? name : this.types[name || config.name];

    return new con(config, id || config[con.prototype.idProperty]);
};

// for test purpose ... don't know if it really works ....
Ext.apply(Ext.util.Format, {
    defaultDateFormat: 'Y-M-d'
});

// pour ne pas avoir le byg avec u200b
Ext.override(Ext.form.HtmlEditor, {
    defaultValue: '<!-- Will be removed by the editor -->',
    cleanDefaultValue: true,
    cleanHtml: function(html) {
        html = String(html);
        if (Ext.isWebKit) {
            html = html.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi, '');
        }
        if (this.cleanDefaultValue) {
            html = html.replace(new RegExp(this.defaultValue), '');
        }
        return html;
    }
});
// pour le scroll sur ipad
Ext.override(Ext.panel.Panel, {
    afterRender: Ext.Function.createSequence(Ext.Panel.prototype.afterRender, function() {        
        if (this.getXType() == 'panel') {
            this._getIScrollElement = function() {
                return (this.el.child('.x-panel-body', true));
            };
        }
        //Uncomment below to use iScroll only on mobile devices but use regular scrolling on PCs.
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) ) {
            if (this._getIScrollElement) {
                this._updateIScroll();
                this.on('afterlayout', this._updateIScroll);
            }
        }
    }),

    _ensureIScroll: function() {
        if (!this.iScroll) {
            var el = this._getIScrollElement();

            if (el && el.children.length > 0) {
                this.iScroll = new iScroll(el);
                this.iScrollTask = new Ext.util.DelayedTask(this._refreshIScroll, this);
            }
        }
    },

    _updateIScroll: function() {
        this._ensureIScroll();
        if (this.iScroll) {
            this.iScrollTask.delay(1000);
        }
    },

    _refreshIScroll: function() {
        this.iScroll.refresh();
        //Refresh one more time.
        this.iScrollTask.delay(1000);
    }
});

Ext.override(Ext.tree.Panel, {
    _getIScrollElement: function() {
        return (this.el.child('.x-panel-body', true));
    }
});

Ext.override(Ext.grid.Panel, {
    _getIScrollElement: function() {
        return (this.el.child('.x-grid-body', true));
    },

    afterRender: Ext.Function.createSequence(Ext.grid.Panel.prototype.afterRender, function() {
        //TODO: need to hook into more events and to update iScroll.
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            this.view.on('refresh', this._updateIScroll, this);
        }
    })
});