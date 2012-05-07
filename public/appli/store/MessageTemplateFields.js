Ext.define('TP.store.MessageTemplateFields', {
    extend: 'Ext.data.Store',
    fields: ['field', 'description'],
    autoLoad: true,
    data: [{
        field: '{{@destinataire.nom}}',
        description: 'Nom du destinataire'
    },
    {
        field: '{{@destinataire.prenom}}',
        description: 'Prénom du destinataire'
    },
    {
        field: '{{@destinataire.civilite}}',
        description: 'Civilité du destinataire'
    },
    {
        field: '{{@destinataire.adresse1}}',
        description: 'Adresse : ligne 1'
    },
    {
        field: '{{@destinataire.adresse2}}',
        description: 'Adresse : ligne 2'
    },
    {
        field: '{{@destinataire.adresse3}}',
        description: 'Adresse : ligne 3'
    },
    {
        field: '{{@destinataire.code_postal}}',
        description: 'Adresse : code postal'
    },
    {
        field: '{{@destinataire.ville}}',
        description: 'Adresse : ville'
    },
    {
        field: '{{@destinataire.pays}}',
        description: 'Adresse : pays'
    },
    {
        field: '{{@destinataire.telephone}}',
        description: 'Numéro de téléphone'
    },
    {
        field: '{{@destinataire.fax}}',
        description: 'Numéro de fax'
    },
    {
        field: '{{@destinataire.portable}}',
        description: 'Numéro de téléphone portable'
    },
    {
        field: '{{@destinataire.email}}',
        description: 'Adresse mail'
    },
    {
        field: '{{@destinataire.site_web}}',
        description: 'Site web'
    },
    {
        field: '{{@destinataire.genre_adresse}}',
        description: 'Titre pour les adresses (ex M. Pierre Dupont)'
    },
    {
        field: '{{@destinataire.genre_lettre}}',
        description: 'Titre dans les lettres (ex M. le Juge Pierre Dupont)'
    },
    {
        field: '{{@destinataire.avocat_au_barreau}}',
        description: 'Avocat au bareau de (si mentionné)'
    },
    {
        field: '{{@destinataire.notes}}',
        description: 'Notes sur le contact'
    },
    {
        field: '{{@dossier.nom_dossier}}',
        description: 'Nom du dossier'
    },
    {
        field: '{{@dossier.ref_cabinet}}',
        description: 'Références du cabinet'
    },
    {
        field: '{{@dossier.date_decision}}',
        description: 'Date de la décision'
    },
    {
        field: '{{@dossier.date_avis_designation}}',
        description: "Date de l'avis de désignation"
    },
    {
        field: '{{@dossier.date_cible_depot_rapport}}',
        description: 'Date cible de dépot du rapport'
    },
    {
        field: '{{@dossier.date_effective_depot_raport}}',
        description: 'Date effective de dépot du rapport'
    },
    {
        field: '{{@dossier.numero_role_general}}',
        description: 'Numéro de role général'
    },
    {
        field: '{{@dossier.typeExpertise}}',
        description: 'Type d\'expertise'
    },
    {
        field: '{{@dossier.typeDecision}}',
        description: 'Type de décision'
    },
    {
        field: '{{@dossier.juridiction}}',
        description: 'Juridiction du dossier'
    },
    {
        field: '{{@dossier.date_debut_op_theorique}}',
        description: 'Date de début des opérations'
    },
    {
        field: '{{@expert.email}}',
        description: 'Email de l\'expert'
    },
    {
        field: '{{@expert.nom}}',
        description: 'Nom de l\'expert'
    },
    {
        field: '{{@expert.civilite}}',
        description: 'Civilité de l\'expert'
    },
    {
        field: '{{@expert.prenom}}',
        description: 'Prénom de l\'expert'
    },
    {
        field: '{{@expert.titre_lettres}}',
        description: 'Titre lettres de l\'expert'
    },
    {
        field: '{{@expert.fonction}}',
        description: 'Fonction de l\'expert'
    },
    {
        field: '{{@expert.adresse1}}',
        description: 'Adresse ligne 1 de l\'expert'
    },
    {
        field: '{{@expert.adresse2}}',
        description: 'Adresse ligne 2 de l\'expert'
    },
    {
        field: '{{@expert.adresse3}}',
        description: 'Adresse ligne 3 de l\'expert'
    },
    {
        field: '{{@expert.code_postal}}',
        description: 'Code postal de l\'expert'
    },
    {
        field: '{{@expert.ville}}',
        description: 'Ville de l\'expert'
    },
    {
        field: '{{@expert.pays}}',
        description: 'Pays de l\'expert'
    },
    {
        field: '{{@expert.telephone}}',
        description: 'Téléphone de l\'expert'
    },
    {
        field: '{{@expert.fax}}',
        description: 'Fax de l\'expert'
    },
    {
        field: '{{@expert.genre_adresse}}',
        description: 'Genre adresse de l\'expert'
    },
    {
        field: '{{@expert.genre_lettre}}',
        description: 'Genre lettres de l\'expert'
    },
    {
        field: '{{@expert.site_web}}',
        description: 'Site web de l\'expert'
    },
    {
        field: '{{@communication.date_communication}}',
        description: 'Date de la communication'
    },
    {
        field: '{{@communication.subject_id}}',
        description: 'Sujet de la communication'
    },
    {
        field: '{{@convocation.description}}',
        description: 'Description de la convocation'
    },
    {
        field: '{{@convocation.no_accedit}}',
        description: 'Numero d\'accedit'
    },
    {
        field: '{{@convocation.terme_date}}',
        description: 'Date de la convocation'
    },
    {
        field: '{{@convocation.heure}}',
        description: 'Heure de la convocation'
    },
    {
        field: '{{@convocation.adresse1}}',
        description: 'Convocation : adresse1'
    },
    {
        field: '{{@convocation.adresse2}}',
        description: 'Convocation : adresse2'
    },
    {
        field: '{{@convocation.adresse3}}',
        description: 'Convocation : adresse3'
    },
    {
        field: '{{@convocation.code_postal}}',
        description: 'Convocation : code postal'
    },
    {
        field: '{{@convocation.ville}}',
        description: 'Convocation : ville'
    },
    {
        field: '{{@convocation.pays}}',
        description: 'Convocation : pays'
    }]
});