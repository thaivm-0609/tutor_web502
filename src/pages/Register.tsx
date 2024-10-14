import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type RegisterInput = {
    name: string,
    email: string,
    password: string
}

function Register() {
    const validateForm = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email({tlds: false}),
        password: Joi.string().required().min(6)
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<RegisterInput>({
        resolver: joiResolver(validateForm)
    });

    const nav = useNavigate()

    const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
        try {
            await axios.post("http://localhost:3000/register", data);
            nav("/login");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">Name</label>
                    <input 
                        type="text" 
                        id="name"
                        {
                            ...register('name')
                        }
                    />
                    {
                        errors?.name && (
                            <span>Tên không được để trống</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        {
                            ...register('email')
                        }
                    />
                    {
                        errors?.email && (
                            <span>Email không đúng định dạng</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        {
                            ...register('password')
                        }
                    />
                    {
                        errors?.password && (
                            <span>Password phải lớn hơn 6 ký tự</span>
                        )
                    }
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register