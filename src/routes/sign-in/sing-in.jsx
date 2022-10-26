import './sign-in.scss';
import { signInWithGoogle } from '../../utils/firebase/firebase.js';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGoogle()
        console.log(response)
    }
    return (
        <div>
            <h1>
                Sign In
            </h1>
            <button onClick={logGoogleUser}>
                Sign In with Google
            </button>
        </div>
    )
}

export default SignIn;