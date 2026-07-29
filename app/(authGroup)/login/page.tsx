import LoginForm from "../_components/loginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-gray-500 mb-3">
              Enter your credentials to access your account
            </p>

            <LoginForm/>
        
    </div>
    </div>
  );
}