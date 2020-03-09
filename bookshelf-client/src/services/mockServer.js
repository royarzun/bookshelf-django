import { Server, Model, Factory } from "miragejs";

const getRandomOption = array => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

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
          copies() {
            const stock = Math.ceil(Math.random() * 3);
            const throwDice = () => Math.random() > 0.5;
            return [...new Array(stock)].map((_, index) => {
              const isAvailable = throwDice();
              return {
                id: `id-${index}`,
                isAvailable,
                location: getRandomOption([
                  "Oficina Andres Bello",
                  "Oficina Hendaya",
                  "Rafael Poveda",
                  "Ricardo Oyarzun"
                ]),
                availabilityDate: isAvailable
                  ? new Date().toISOString()
                  : "2045-08-08T22:55:09.492Z"
              };
            });
          },
          description(i) {
            return `Book description ${i}`;
          },
          tags: ["python", "django"],
          isAvailable() {
            return this.copies.filter(copy => copy.isAvailable).length > 0;
          }
        })
      },

      routes() {
        this.namespace = "api/v1";
        this.get("/books", (schema, request) => {
          return schema.books.all();
        });
        this.get("/books/:id", (schema, request) => {
          const { id } = request.params;
          return schema.books.find(id);
        });
      },

      seeds(server) {
        server.createList("book", 20);
      }
    });
  }
};
