import { Server, Model, Factory } from "miragejs";

export default {
  init: () => {
    new Server({
      models: {
        book: Model
      },

      factories: {
        book: Factory.extend({
          name(i) {
            return `Book ${i} with a large name but very descriptive`;
          },
          isbn() {
            return `${Math.floor(Math.random() * 200000)}`;
          },
          cover_img_url:
            "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/9831/9781983172663.jpg",
          likes: ["1", "2"],
          likes_count: 2,
          created_at: "2020-02-29",
          comments: [],
          description(i) {
            return `Book description ${i}`;
          },
          tags: ["python", "django"],
          isAvailable() {
            return Math.random() > 0.5;
          }
        })
      },

      routes() {
        this.namespace = "api/v1";
        this.get("/books", (schema, request) => {
          return schema.books.all();
        });
      },

      seeds(server) {
        server.createList("book", 20);
      }
    });
  }
};
