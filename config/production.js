var config = module.exports = {}

config.url = "https://nishant-fcc-voting-app.herokuapp.com"
config.db_url = process.env.MONGODB_URI
config.cwd = process.cwd() || __dirname
