import { useState } from "react";
import RegisterForm from "../components/RegistrationForm/RegistrationForm.js";
import LoginForm from "./LoginForm";

const Index = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div>
      <div className="bg-white flex justify-between p-4 fixed z-50 w-full">
        <div className="logo bg-no-repeat p-5 pr-28"></div>
        <div className="flex gap-12" id="buttons-login">
          <button
            className="bg-transparent pr-2 pl-2 text-green-400 font-bold rounded-md decoration-solid transition ease-in-out delay-150 hover:scale-110 duration-300"
            onClick={() => setIsRegister(false)}
          >
            Área do cliente
          </button>
          <button
            className="bg-green-500 pr-2 pl-2  text-white font-bold rounded-md transition ease-in-out delay-150 hover:scale-110 duration-300 hover:bg-green-600 hover:text-gray-900"
            onClick={() => setIsRegister(true)}
          >
            Cadastre-se
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-flow-col pt-32 mx-20 pb-64">
        <div className="cel row-end-3 row-span-2  bg-no-repeat z-10 rounded-3xl px-96 pb-80"></div>
        <div className="row-start-1 row-end-4 mx-12 z-10">
          {isRegister ? <RegisterForm /> : <LoginForm />}
        </div>
        <div className="bg-pic row-start-2 row-span-2  bg-no-repeat z-10 rounded-3xl ml-10 opacity-60 pb-52"></div>
      </div>
      <div className="bg-green-500 absolute top-0 px-40 z-0 h-full"></div>
    </div>
  );
};

export default Index;
