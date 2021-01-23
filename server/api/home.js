const home = (req, res) => {
  res.json({
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: `Babatunde Afolabi`,
      github: `@Dontunee`,
      email: `t_afolabi@yahoo.com`,
      mobile: `09033176887`,
      twitter: `@dontune`,
    },
  });
};

module.exports = {
    home,
};
