const dbmigrate = require('db-migrate')

export const dbm = dbmigrate.getInstance(true)
dbm.silence(true)