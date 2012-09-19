if (typeof process.env.MONGOHQ_URL == 'undefined') {
  process.env.MONGOHQ_URL = "mongodb://localhost/folyam-engine";
}


module.exports.applicationName = 'Folyam'
module.exports.mongo = {
  url: process.env.MONGOHQ_URL
}