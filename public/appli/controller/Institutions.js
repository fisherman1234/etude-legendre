Ext.define('TP.controller.Institutions', {
    extend: 'Ext.app.Controller',
    stores: ['Institutions'],
    models: ['Institution'],
    views: ['institution.List', 'institution.EditForm', 'institution.Edit'],

    init: function() {
        this.control({
            'viewport > institutionlist': {
                itemdblclick: this.editInstitution
            },
            'institutionEdit button[action=save]': {
                click: this.updateInstitution
            }
        });
    },

    editInstitution: function(grid, record) {
        var view = Ext.widget('institutionedit');
        view.down('form').loadRecord(record);
    },

    updateInstitution: function(button) {
        var win = button.up('panel'),
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        if (typeof(record) != 'undefined') { // this records exits, let's save it
            record.set(values);
        } else { //let's go for create & save !
            institution = Ext.ModelManager.create(values, 'TP.model.Institution');
            Ext.getStore('TP.store.Institutions').insert(0, institution);
        }
				Ext.getStore('TP.store.Institutions').sync();
        win.close();
    }
});