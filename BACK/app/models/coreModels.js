const client = require('../database');


class CoreModel {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    async addAlbum(userId, itemId, itemType) {

        try {

                const { rows } = await client.query('INSERT INTO "USER"(mail, lastname, firstname, pseudo, "password") VALUES($1, $2, $3, $4, $5) RETURNING id',
                     [this]);
 
                 this.id = rows[0].id;
                 delete this.password;
                 return this;
            
               

        } catch (error) {
    
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }


    static async findAllByUser(id) {
        try {
            const { rows } = await db.query('SELECT tracks, artists, albums FROM userTracksAlbumsArtists WHERE id=$1');
            return rows.map(row => new Track(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }




insert(callback) {
    //this.constructor, dans le contexte d'instance, contient une référence vers la classe qui a permis de fabriquer l'instance
    //on peut utiliser cette référence pour accéder aux propriétés statiques même dans ce contexte
    const tableName = this.constructor.tableName;
    // console.log('this', this);
    // console.log('this.constructor', this.constructor);
    // console.log('tableName', this.constructor.tableName);

    // on déclare 3 tableaux pour stocker le nom des champs, la valeur des champs et leur position dans la requête

    const fieldNames = [];
    const fieldValues = [];
    const fieldPostions = []

    let count = 1;
    //on parcoure l'object courant avec une boucle for in pour accéder aux noms des propriétés
    //Attention, pour ces requêtes, on ne prend pas en compte l'id des enregistrements mais vu qu'on a été malin, que l'id dans le CoreModel est privé (masqué, pas accessible, ...) il n'apparaitra pas dans la boucle
    for (const propName in this) {
        // console.log('Nom de la propriété :', propName);
        // console.log('Valeur de la propriété :', this[propName]);
        fieldNames.push(`"${propName}"`);
        fieldValues.push(this[propName]);

        fieldPostions.push(`$${count}`);
        //fieldIndex.push('$' + count);
        count++;
    }

    console.log('names', fieldNames);
    console.log('values', fieldValues);
    console.log('positions', fieldPostions);

    const preparedQuery = {
        text: `INSERT INTO "${tableName}"(${fieldNames.join(', ')}) VALUES(${fieldPostions.join(', ')}) RETURNING id`,
        values: fieldValues
    }
    console.log('requête', preparedQuery.text);

    client.query(preparedQuery , (error, result) => {
        if (error) {
            callback(error);
        } else {
            const newId = result.rows[0].id;
            this.id = newId;
            console.log('this, après la sauvegarde, contient', this);
            callback(null, this);
        }
    })

}

}

module.exports = CoreModel; 