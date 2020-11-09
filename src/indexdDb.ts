
import { IDBPDatabase, openDB } from 'idb';

class IndexedDb {
    private database: string;
    private db: any;

    constructor(database: string) {
        this.database = database;
    }


    private async createObjectStore(tableName: string) {
        try {
            this.db = await openDB(this.database, 4, {
                upgrade(db: IDBPDatabase) {
                    if (!db.objectStoreNames.contains(tableName))
                        db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });

                },
            });
        } catch (error) {
            return false;
        }
    }

    private async getStore(tableName: string) {
        if (this.db === undefined)
            await this.createObjectStore(tableName);
         const tx = this.db.transaction(tableName, 'readwrite');
         return tx.objectStore(tableName);

    }

    public async getAllValue(tableName: string) {
        const store = await this.getStore(tableName);
        const result = await store.getAll();
        return result;
    }

    public async putValue(tableName: string, value: object) {
        const store = await this.getStore(tableName);
        const result = await store.put(value);
        return result;
    }



    public async deleteValue(tableName: string, id: number) {
        const store = await this.getStore(tableName);
        const result = await store.get(id);
        if (!result) {
            return result;
        }
        await store.delete(id);

        return id;
    }


}

export default IndexedDb;