var config = module.exports = {}

config.url = "http://localhost:3000"
config.db_url = process.env.MONGODB_URI || "mongodb://localhost:27012"
config.cwd = process.cwd() || __dirname
