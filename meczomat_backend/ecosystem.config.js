module.exports = {
  apps : [{
    name   : "meczomat",
    script : "server.js",
    watch  : true,
    env    : {
      "NODE_ENV": "production",
    }
  }]
}