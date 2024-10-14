import axios from "axios"
import { Book } from "../types/Book"
import { useState, useEffect } from "react"

function List() {
    const [books, setBooks] = useState<Book[]>([]);
    const getListBook = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/books");
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`http://localhost:3000/books/${id}`);
                alert('Delete successfully');
                getListBook();
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getListBook();
    }, []);

    return (
        <div>
            <h1>Danh sách books</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { books.map((book,index) => (
                        <tr key={index}>
                            <td>{ book.id }</td>
                            <td>{ book.name }</td>
                            <td>{ book.price }</td>
                            <td>{ book.description }</td>
                            <td>
                                <img src={book.image} alt="" />
                            </td>
                            <td>
                                <a href={"/books/edit/"+book.id}>Edit</a>
                                <a onClick={() => handleDelete(book.id)}>Delete</a>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default List