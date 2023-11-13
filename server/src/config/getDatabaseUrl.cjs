const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/light-spar_development",
      test: "postgres://postgres:postgres@localhost:5432/light-spar_test",
      e2e: "postgres://postgres:postgres@localhost:5432/light-spar_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
