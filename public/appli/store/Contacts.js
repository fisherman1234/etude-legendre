Ext.define('TP.store.Contacts', {
    extend: 'Ext.data.Store',
    model: 'TP.model.Contact',
    sortasc: function(){
      this.sort([
          {
              property : 'nom',
              direction: 'ASC'
          },
          {
              property : 'entreprise',
              direction: 'ASC'
          }
      ]);
    },
    listeners: {
        write: function(store, operation) {
						store2 = Ext.getStore('TP.store.TreeActeurs');
            if (typeof(store2.proxy.extraParams.dossier) != 'undefined') {
                console.log('updated');
                store2.load();
            }
        },
        datachanged: function(store){
          /*
          Not a good idea : mess up of all contact inserts afterwards
          if (typeof(store.lastsync) === 'undefined' || (new Date()-store.lastsync > 10000)){
            store.lastsync = new Date();
              console.log(store);
              store.sort([
                  {
                      property : 'nom',
                      direction: 'ASC'
                  },
                  {
                      property : 'entreprise',
                      direction: 'ASC'
                  }
              ]);
            }
            */
          }
          

          

    }
});