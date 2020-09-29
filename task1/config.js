const config = {
  PORT: process.env.PORT || 8080,
};

process.argv.slice(2).forEach(item => {
  const [key, value] = item.slice(1).split('=');
  config[key] = value;
});

module.exports = config;