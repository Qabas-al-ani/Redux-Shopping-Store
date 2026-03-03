export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function getProductImageSrc(image) {
  if (!image) return '';
  return image.startsWith('http') ? image : `/images/${image}`;
}

// Placeholder when product image fails to load (avoids broken-image icon)
export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#e0e0e0" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9e9e9e" font-family="sans-serif" font-size="16">No image</text></svg>'
  );

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 2);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      if (e.oldVersion < 1) {
        db.createObjectStore('products', { keyPath: '_id' });
        db.createObjectStore('categories', { keyPath: '_id' });
        db.createObjectStore('cart', { keyPath: '_id' });
      }
      if (e.oldVersion < 2 && db.objectStoreNames.contains('products')) {
        db.deleteObjectStore('products');
        db.createObjectStore('products', { keyPath: '_id' });
      }
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
