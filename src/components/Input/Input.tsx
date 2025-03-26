type InputFieldProps = {
    type: string,
    label: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    readOnly?: boolean;
};
  
const Input = ({ type, label, name, value, onChange, readOnly }: InputFieldProps) => {
    return (
      <div className="flex flex-col max-sm:text-xs">
        <label htmlFor={name}>{label}</label>
        <input className="border border-neutral-300 h-10 w-full p-2 focus:outline-none" type={type} name={name} value={value} onChange={onChange} readOnly={readOnly} />
      </div>
    );
};

export default Input
  