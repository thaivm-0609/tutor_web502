export type Book = {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
}

export type BookInput = Omit<Book, "id">;