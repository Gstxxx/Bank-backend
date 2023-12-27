import React from "react";
import InputMask from "react-input-mask";

const InputField = ({ label, id, value, onChange, placeholder }) => (
  <div className="relative float-label-input">
    {id === "cpf" ? (
      <InputMask
        type="text"
        value={value}
        onChange={onChange}
        mask={value.length <= 14 ? "999.999.999-99" : "99.999.999/9999-99"}
        id={id}
        placeholder={placeholder}
        style={{ color: "gray" }}
        className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-green-400"
      />
    ) : (
      <input
        type={id === "email" ? "email" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        placeholder={placeholder}
        style={{ color: "gray" }}
        className="block w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 appearance-none leading-normal focus:border-green-400"
      />
    )}
    <label
      htmlFor={id}
      className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker"
    >
      {label}
    </label>
  </div>
);

export default InputField;
