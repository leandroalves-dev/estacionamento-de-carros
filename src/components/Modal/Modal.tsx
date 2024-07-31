import { IServices } from '../Interfaces/IServices'
import './Modal.css'

interface PropsModal{
    currentTitle: IServices;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onClose: () => void
}

const Modal = ({onClose, currentTitle, onSave, onChange}: PropsModal) => {
  
 return (
    <div className="modal" style={{ display: 'block' }}>
        <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Editar Veículo</h2>
            <div className='content'>
                <div className='fields'>
                  <label htmlFor="modelo">Modelo do Veículo</label>
                  <input type="text" name='modelo' value={currentTitle.modelo} onChange={onChange} />
                </div>
                <div className='fields'>
                  <label htmlFor="placa">Placa do Veículo</label>
                  <input type="text" name='placa' value={currentTitle.placa} onChange={onChange} />
                </div>
                <div className='fields'>
                  <label htmlFor="entrada">Hora de Entrada</label>
                  <input type="text" name='entrada' value={currentTitle.entrada} readOnly />
                </div>
                <button onClick={onSave}>Salvar</button>
            </div>
        </div>
    </div>
  )
}

export default Modal