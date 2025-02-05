// Mock Data
let books = [
    { id: '1', title: 'The Awakening', author: 'Kate Chopin' },
    { id: '2', title: 'City of Glass', author: 'Paul Auster' },
];
export const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find((book) => book.id === id),
    },
    Mutation: {
        addBook: (_, { title, author }) => {
            const newBook = { id: String(books.length + 1), title, author };
            books.push(newBook);
            return newBook;
        },
        deleteBook: (_, { id }) => {
            const bookIndex = books.findIndex((book) => book.id === id);
            if (bookIndex === -1) return null;
            const [deletedBook] = books.splice(bookIndex, 1);
            return deletedBook;
        },
    },
};