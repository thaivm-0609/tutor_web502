import axios from "axios"
import { BookInput } from "../types/Book"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";

function Create() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<BookInput>();

    const nav = useNavigate();

    const onSubmit: SubmitHandler<BookInput> = async (data) => {
        try {
            await axios.post("http://localhost:3000/books", data);
            alert('Create successfully');
            nav("/books");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Thêm mới sách</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        {
                            ...register("name", {
                                required: "Name is required"
                            })
                        }
                    />
                    { errors?.name && (
                        <span>{errors?.name?.message}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="">Price</label>
                    <input 
                        type="number" 
                        id="price"
                        {
                            ...register("price", {
                                min: {
                                    value: 0,
                                    message: "Price must be greater than 0"
                                }
                            })
                        }
                    />
                    { errors?.price && (
                        <span>{errors?.price?.message}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input 
                        type="text" 
                        id="description"
                        {
                            ...register("description", {})
                        }
                    />
                </div>
                <div>
                    <label htmlFor="">Image</label>
                    <input 
                        type="text" 
                        id="image"
                        {
                            ...register("image", {})
                        }
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Create