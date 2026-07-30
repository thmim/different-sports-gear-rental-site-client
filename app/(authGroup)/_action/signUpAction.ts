"use server"

type RegisterState = {
  success: boolean;
  message: string;
};

export const registerAction = async (previousState:RegisterState,formData: FormData) => {

  console.log(formData)
  const name = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    console.log("not matched")
    return {
      success: false,
      message: "Passwords do not match",
    };
  }

  
    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      password,
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
console.log(result,"fetch result")
console.log(result.success,"fetch result")
    if (result.success) {
         return {
    success: true,
    message: "Registration successful!",
  };
      
    }

    return {
    success: false,
    message: result.message,
  };

  
};