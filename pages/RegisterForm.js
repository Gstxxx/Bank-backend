import { useState } from "react";
import InputMask from "react-input-mask";

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
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, fullName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <form className="flex flex-col gap-0" onSubmit={handleRegister}>
        <div className="relative float-label-input">
          <InputMask
            type="text"
            value={cpf}
            onChange={handleInputChange}
            mask={cpf.length <= 14 ? "999.999.999-99" : "99.999.999/9999-99"}
            id="cpf"
            placeholder=""
            style={{ color: "gray" }}
            className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-green-400"
          />
          <label
            htmlFor="cpf"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
          >
            CPF
          </label>
        </div>

        <div className="relative float-label-input">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="name"
            placeholder=" "
            style={{ color: "gray" }}
            className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-green-400"
          />
          <label
            htmlFor="name"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
          >
            Nome
          </label>
        </div>

        <div className="relative float-label-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder=" "
            style={{ color: "gray" }}
            className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-green-400"
          />
          <label
            htmlFor="email"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
          >
            Email
          </label>
        </div>

        <div className="relative float-label-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder=" "
            style={{ color: "gray" }}
            className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-green-400"
          />
          <label
            htmlFor="password"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
          >
            Senha
          </label>
        </div>
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
