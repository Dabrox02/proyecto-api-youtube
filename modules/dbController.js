const indb = window.indexedDB;
const DB = "videosCache";
const STORE = "videosStore";

export const openDB = (onSuccess, onError) => {
    let DBOpenReq = indb.open(DB, 1);

    DBOpenReq.addEventListener("error", (err) => {
        console.log("Error", err);
        if (onError) onError(err);
    })

    DBOpenReq.addEventListener("upgradeneeded", (ev) => {
        let db = ev.target.result;
        console.log("Upgrade", db);
        if (!db.objectStoreNames.contains(DB)) {
            db.createObjectStore(STORE, {
                keyPath: null,
                autoIncrement: true
            });
        }
    })

    DBOpenReq.addEventListener("success", (ev) => {
        let db = ev.target.result;
        console.log("Success", db);
        if (onSuccess) onSuccess(db);
    })
};

// Agregar Datos
// openDB(async (db) => {
//     let data = await getData();
//     let { items } = data;

//     const transaction = db.transaction(['videosStore'], 'readwrite');
//     const objectStore = transaction.objectStore('videosStore');
//     items.forEach(e => {
//         const request = objectStore.add(e);
//     });
// }, (err) => {
//     console.error("Error al abrir la base de datos:", err);
// });

// Obtener Datos getAll
const getAll = () => {
    openDB(async (db) => {
        const transaction = db.transaction(["videosStore"], "readonly");
        const objectStore = transaction.objectStore("videosStore");
        const getRequest = objectStore.getAll();

        getRequest.onsuccess = (e) => {
            const datos = e.target.result;
            console.log("Datos obtenidos:", datos);
        };

        getRequest.onerror = (e) => {
            console.error("Error al obtener datos:", e.target.error);
        };

    }, (err) => {
        console.error("Error al abrir la base de datos:", err);
    });
}

// Obtener Datos con cursor 
const getCursor = () => {
    openDB(async (db) => {
        const transaction = db.transaction(["videosStore"], "readonly");
        const objectStore = transaction.objectStore("videosStore");
        const cursorRequest = objectStore.openCursor();

        console.log(cursorRequest);
        cursorRequest.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
                const datos = cursor.value;
                console.log("Datos obtenidos:", datos);
                cursor.continue();
            } else {
                console.log("No hay más datos en el almacén de objetos.");
            }
        };
        cursorRequest.onerror = (e) => {
            console.error("Error al abrir el cursor:", e.target.error);
        };
    }, (err) => {
        console.error("Error al abrir la base de datos:", err);
    });
}

// Obtener un solo Registro
const getOne = (id) => {
    openDB(async (db) => {
        const transaction = db.transaction(["videosStore"], "readonly");
        const objectStore = transaction.objectStore("videosStore");
        const getRequest = objectStore.get(id);

        getRequest.onsuccess = (e) => {
            console.log(e.target.result);
        };
        getRequest.onerror = (e) => {
            console.error("Error al obtener el registro:", e.target.error);
        };
    }, (err) => {
        console.error("Error al abrir la base de datos:", err);
    });
}

// Actualizar Registro
const updateOne = (data) => {
    openDB(async (db) => {
        const transaction = db.transaction(["videosStore"], "readwrite");
        const objectStore = transaction.objectStore("videosStore");
        const getRequest = objectStore.put(data);

        getRequest.onsuccess = (e) => {
            console.log(e.target.readyState);
        };
        getRequest.onerror = (e) => {
            console.error("Error al obtener el registro:", e.target.error);
        };
    }, (err) => {
        console.error("Error al abrir la base de datos:", err);
    });
}

// Eliminar Registro
const deleteOne = (id) => {
    openDB(async (db) => {
        const transaction = db.transaction(["videosStore"], "readwrite");
        const objectStore = transaction.objectStore("videosStore");
        const getRequest = objectStore.delete(id);

        getRequest.onsuccess = (e) => {
            console.log(e.target.readyState);
        };
        getRequest.onerror = (e) => {
            console.error("Error al obtener el registro:", e.target.error);
        };
    }, (err) => {
        console.error("Error al abrir la base de datos:", err);
    });
}

// Validar datos DB
export const indbIsEmpty = () => {
    return new Promise((resolve, reject) => {
        openDB(async (db) => {
            const transaction = db.transaction([STORE], "readonly");
            const objectStore = transaction.objectStore(STORE);
            const countRequest = objectStore.count();

            countRequest.onsuccess = (e) => {
                console.log(e.target.readyState);
                let countRows = e.target.result;
                resolve(countRows === 0);
            };
            countRequest.onerror = (e) => {
                console.error("Error al obtener el registro:", e.target.error);
                reject(e.target.error);
            };
        }, (err) => {
            console.error("Error al abrir la base de datos:", err);
            reject(err);
        });
    });
}
