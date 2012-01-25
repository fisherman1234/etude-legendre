Ext.define('TP.controller.Expenses', {
    extend: 'Ext.app.Controller',
    stores: ['Expenses', 'TP.store.TauxTvas', 'TP.store.Activites', 'TP.store.Unites', 'TP.store.QuoteExpenses'],
    models: ['Expense', 'TP.model.TauxTva', 'TP.model.Activite', 'TP.model.Unite'],

    init: function() {

    }

});