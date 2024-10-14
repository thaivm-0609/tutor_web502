import axios from "axios"
import { BookInput } from "../types/Book"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function Edit() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<BookInput>();

    const nav = useNavigate();

    const { id } = useParams();
    const getDetail = async (id: string) => {
        try {
            const { data } = await axios.get("http://localhost:3000/books/"+id);
            reset({
                name: data.name,
                price: data.price,
                description: data.description,
                image: data.image
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!id) return;
        getDetail(id);
    }, [id])

    const onSubmit: SubmitHandler<BookInput> = async (data) => {
        try {
            await axios.put("http://localhost:3000/books/"+id, data);
            alert('Update successfully');
            nav("/books");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Edit book</h1>
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
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default Edit