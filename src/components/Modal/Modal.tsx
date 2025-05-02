import { IServices } from '../Interfaces/IServices'

import Input from '../Input/Input';
interface PropsModal{
    currentTitle: IServices;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onClose: () => void
}

const Modal = ({onClose, currentTitle, onSave, onChange}: PropsModal) => {
  
 return (
  <div className="fixed z-10 inset-0 flex justify-center items-center bg-neutral-800 max-sm:px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
    <div className="relative bg-white max-w-[700px] w-full p-10">
        <span className="absolute top-2 right-3 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
          <h2 className="text-neutral-900 text-center mb-4 text-2xl font-bold">Editar Veículo</h2>
          <div className="flex flex-row gap-4 max-sm:gap-1">

                <Input type='text' label="Modelo do Veículo" name="modelo" value={currentTitle.modelo} onChange={onChange} />
                <Input type='text' label="Placa do Veículo" name="placa" value={currentTitle.placa} onChange={onChange} />
                <Input type='text' label="Hora de Entrada" name="entrada" value={currentTitle.entrada} readOnly />

                <button className="bg-sky-400/40 backdrop-blur-md h-10 text-neutral-800 pr-6 pl-6 mt-6 cursor-pointer max-sm:mt-8 max-sm:text-xs" onClick={onSave}>
                    Salvar
                </button>

          </div>
      </div>
    </div>

  )
}

export default Modal