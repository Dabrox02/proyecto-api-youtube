import { URI } from "./modules/config.js";
import { request } from "./modules/apiController.js";
import { openDB, indbIsEmpty } from "./modules/dbController.js";


addEventListener("DOMContentLoaded", (e) => {
    
})

// let data = await request({
//     uri: URI, config: {
//         headers: { "content-type": "application/json" }
//     }
// })

// openDB(async (db) => {
//     let { contents: items } = data;
//     console.log(items)
//     const transaction = db.transaction(['videosStore'], 'readwrite');
//     const objectStore = transaction.objectStore('videosStore');
//     items.forEach(e => {
//         const request = objectStore.add(e);
//     });
// }, (err) => {
//     console.error("Error al abrir la base de datos:", err);
// });

let dbExists = await indbIsEmpty();
console.log("hola por fuera")
