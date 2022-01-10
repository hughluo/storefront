const dbmigrate = require('db-migrate')

export const dbm = dbmigrate.getInstance(true, {'cmdOption': '-e test'})
dbm.silence(true)