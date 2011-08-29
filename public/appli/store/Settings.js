Ext.define('TP.store.Settings', {
    extend: 'Ext.data.Store',
    fields: ['id', 'description', 'card_id'],
    autoLoad: true,
    data: [{
        id: 1,
        description: 'Categories',
        card_id: 0
    },
    {
        id: 2,
        description: 'Dépenses',
        card_id: 1
    },
    {
        id: 3,
        description: 'Qualités procédurales',
        card_id: 2
    },
    {
        id: 4,
        description: 'Taux tva',
        card_id: 3
    },
    {
        id: 5,
        description: 'Moyens de transmission',
        card_id: 4
    },
    {
        id: 6,
        description: 'Types d\'activité',
        card_id: 5
    },
    {
        id: 7,
        description: 'Types de décision',
        card_id: 6
    },
    {
        id: 8,
        description: 'Types d\'état de dossier',
        card_id: 7
    },
    {
        id: 9,
        description: 'Types d\'expertise',
        card_id: 8
    },
    {
        id: 10,
        description: 'Types de société',
        card_id: 9
    },
    {
        id: 11,
        description: 'Types d\'intervenants',
        card_id: 10
    },
    {
        id: 12,
        description: 'Unités',
        card_id: 11
    },
    {
        id: 13,
        description: 'Paramètres du cabinet',
        card_id: 12
    },
    {
        id: 14,
        description: 'Utilisateurs',
        card_id: 13
    }]
});