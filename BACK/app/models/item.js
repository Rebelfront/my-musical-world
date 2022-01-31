class Item {

    question;
    anecdote;
    wiki;
    level_id;
    answer_id;
    quiz_id;

    static tableName = 'question';

    constructor(obj) {
        super(obj);
        for (const propName in obj) {
            if (propName !== 'id')
                this[propName] = obj[propName];
        }
    }

    static findBy(user, callback) {
        console.log('this contient', this);
       
        //on identifie les éléments commus et les éléments varibales dans les 2 requêtes :
        // ce qui va changer :
        //- le nom de la table
        //- les éléments à indiquer dans le where

        //dans le contexte static, le nom de la table est accessible à travers this (qui pointe sur la classe et donne accès aux propriétés statiques)

        //la boucle sur l'object params va permettre de récupérer les infos nécessaires pour le WHERE de la requête
        const filters = [];
        const values = [];

        let count = 1;

        //pour chaque propriété de l'object
        for (const propName in params) {
            console.log('propName', propName);
            console.log('value', params[propName])

            //on stocke la valeur associée
            values.push(params[propName]);

            //on stocke une string de la forme "<nom_propriété>"=$x
                        // "name"=$1
            filters.push(`"${propName}"=$${count}`);
//            filters.push('"'+propName+'"=$' + count);
            count++;
        }
        console.log('filters', filters);
        console.log('values', values);
    
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE ${filters.join(' AND ')}`,
            values
        };
        console.log(preparedQuery.text);
        client.query(preparedQuery, (error, result) => {
            if (error) {
                callback(error);
            } else {
                //on peut éventuellement récupérer plusieurs enregistrements en base
                //on prévoit le coup en stockant les résultats dans un tableau d'instance

                //si on a reçu des résultats
                if (result.rows.length > 0) {
                    const instances = []
                    for (const data of result.rows) {
                        instances.push(new this(data));
                    }
                    callback(null, instances);
                } else {
                    //aucun résultat ne correspond à la requête
                    callback('Aucun enregistrement trouvé');
                }
            }
        });

    }
};


module.exports = Level;