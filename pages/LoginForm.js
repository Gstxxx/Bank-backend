import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando um tempo de carregamento com setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Ajuste o valor do timeout conforme necessário

    // Limpando o timeout ao desmontar o componente
    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Ajuste o valor do timeout conforme necessário
        const data = await response.json();
        console.log("Login successful:", data);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Ajuste o valor do timeout conforme necessário
        console.error("Login failed");
      }
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Ajuste o valor do timeout conforme necessário
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="bg-white p-10 rounded-xl flex flex-col gap-0">
      {isLoading ? (
        <div>
          <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin " />
        </div>
      ) : (
        <form className="flex flex-col gap-0" onSubmit={handleLogin}>
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
            Entrar
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
