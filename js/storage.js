// Save data in Local Storage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Get data from Local Storage
function getData(key) {
    const data = localStorage.getItem(key);

    if (data) {
        return JSON.parse(data);
    }

    return [];
}

// Open IndexedDB database
function openPortfolioDB() {

    return new Promise(function(resolve, reject) {

        const request = indexedDB.open("SrushtiPortfolioDB", 1);

        request.onupgradeneeded = function(event) {

            const db = event.target.result;

            if (!db.objectStoreNames.contains("reports")) {
                db.createObjectStore("reports", {
                    keyPath: "id"
                });
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function() {
            reject(request.error);
        };

    });
}

// Save uploaded report
async function saveReport(report) {

    const db = await openPortfolioDB();

    return new Promise(function(resolve, reject) {

        const transaction = db.transaction("reports", "readwrite");

        transaction.objectStore("reports").put(report);

        transaction.oncomplete = function() {
            db.close();
            resolve();
        };

        transaction.onerror = function() {
            db.close();
            reject(transaction.error);
        };

    });
}

// Get all uploaded reports
async function getAllReports() {

    const db = await openPortfolioDB();

    return new Promise(function(resolve, reject) {

        const transaction = db.transaction("reports", "readonly");

        const request = transaction.objectStore("reports").getAll();

        request.onsuccess = function() {
            db.close();
            resolve(request.result);
        };

        request.onerror = function() {
            db.close();
            reject(request.error);
        };

    });
}

// Delete uploaded report
async function deleteReport(id) {

    const db = await openPortfolioDB();

    return new Promise(function(resolve, reject) {

        const transaction = db.transaction("reports", "readwrite");

        transaction.objectStore("reports").delete(id);

        transaction.oncomplete = function() {
            db.close();
            resolve();
        };

        transaction.onerror = function() {
            db.close();
            reject(transaction.error);
        };

    });
}

// Open IndexedDB database
function openPortfolioDB() {

    return new Promise(function(resolve, reject) {

        const request = indexedDB.open("SrushtiPortfolioDB", 1);

        request.onupgradeneeded = function(event) {

            const db = event.target.result;

            if (!db.objectStoreNames.contains("reports")) {
                db.createObjectStore("reports", {
                    keyPath: "id"
                });
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function() {
            reject(request.error);
        };

    });
}

// Save uploaded report
async function saveReport(report) {

    const db = await openPortfolioDB();

    return new Promise(function(resolve, reject) {

        const transaction = db.transaction("reports", "readwrite");

        transaction.objectStore("reports").put(report);

        transaction.oncomplete = function() {
            db.close();
            resolve();
        };

        transaction.onerror = function() {
            db.close();
            reject(transaction.error);
        };

    });
}

// Get all uploaded reports
async function getAllReports() {

    const db = await openPortfolioDB();

    return new Promise(function(resolve, reject) {

        const transaction = db.transaction("reports", "readonly");

        const request = transaction.objectStore("reports").getAll();

        request.onsuccess = function() {
            db.close();
            resolve(request.result);
        };

        request.onerror = function() {
            db.close();
            reject(request.error);
        };

    });
}

// Delete uploaded report
async function deleteReport(id) {

    const db = await openPortfolioDB();

    return new Promise(function(resolve, reject) {

        const transaction = db.transaction("reports", "readwrite");

        transaction.objectStore("reports").delete(id);

        transaction.oncomplete = function() {
            db.close();
            resolve();
        };

        transaction.onerror = function() {
            db.close();
            reject(transaction.error);
        };

    });
}