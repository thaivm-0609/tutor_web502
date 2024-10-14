import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

type LoginInput = {
    email: string,
    password: string
}

function Login() {
    const validateForm = Joi.object({
        email: Joi.string().required().email({tlds: false}),
        password: Joi.string().required().min(6)
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginInput>({
        resolver: joiResolver(validateForm)
    });

    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/login", data);
            localStorage.setItem('token', response.data.accessToken);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login