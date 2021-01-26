const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

export default {
  url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
