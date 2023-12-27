import React, { useState } from "react";
import InputField from "./InputField";

const RegistrationForm = () => {
  const [cpf, setCpf] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    setCpf(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, fullName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        handleRegistrationSuccess(data);
      } else {
        handleRegistrationFailure();
      }
    } catch (error) {
      handleRegistrationError(error);
    }
  };

  const handleRegistrationSuccess = (data) => {
    console.log("Registration successful:", data);
  };

  const handleRegistrationFailure = () => {
    console.error("Registration failed");
  };

  const handleRegistrationError = (error) => {
    console.error("Error during registration:", error);
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <form className="flex flex-col gap-0" onSubmit={handleRegister}>
        <InputField
          label="CPF"
          id="cpf"
          value={cpf}
          onChange={handleInputChange}
          placeholder=""
        />
        <InputField
          label="Nome"
          id="name"
          value={fullName}
          onChange={setFullName}
          placeholder=" "
        />
        <InputField
          label="Email"
          id="email"
          value={email}
          onChange={setEmail}
          placeholder=" "
        />
        <InputField
          label="Senha"
          id="password"
          value={password}
          onChange={setPassword}
          placeholder=" "
        />
        <button
          className="mt-2 border border-green-500 rounded-md p-3 text-green-500 transition ease-in-out delay-150 hover:translate-y-1 duration-300 hover:text-white hover:border-green-400 hover:bg-green-400"
          type="submit"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
