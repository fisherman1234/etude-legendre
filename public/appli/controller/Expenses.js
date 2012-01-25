Ext.define('TP.controller.Expenses', {
    extend: 'Ext.app.Controller',
    stores: ['Expenses', 'TP.store.TauxTvas', 'TP.store.Activites', 'TP.store.QuoteExpenses'],
    models: ['Expense', 'TP.model.TauxTva', 'TP.model.Activite'],

    init: function() {

    }

});