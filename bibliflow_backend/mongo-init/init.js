db = db.getSiblingDB('logsDB');

db.createUser({
    user: 'appuser',
    pwd: 'apppassword',
    roles: [
        {
            role: 'readWrite',
            db: 'logsDB'
        }
    ]
});
