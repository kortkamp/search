const authConfig = {
  jwt: {
    expiresIn: '30d',
    secret: `${process.env.SECRET}`,
  },
  // age in ms
  // 12h
  tokenMaxAge: 43200000,
  config_path: `${__dirname}`,
};

export { authConfig };
