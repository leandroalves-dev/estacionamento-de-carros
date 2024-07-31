import { useState } from "react";
import './Modal.css'

import { IServices } from "../Interfaces/IServices";
import { toast } from "react-toastify";

interface CheckoutModalProps {
    car: IServices;
    onClose: () => void;
    onPayment: (id: number) => void;
}

const CheckoutModal = ({car, onClose, onPayment}: CheckoutModalProps ) => {

    const [manualTime, setManualTime] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);
    const [total, setTotal] = useState<string | null>(null);

    const calculateDifference = () => {
        if(manualTime) {
            const [hourEntry, minuteEntry] = car.entrada.split(':').map(Number);
            const [manualHours, manualMinutes] = manualTime.split(':').map(Number);
        
            const entryTotalMinutes = hourEntry * 60 + minuteEntry;
            const manualTotalMinutes = manualHours * 60 + manualMinutes;
        
            const diffMinutes = Math.abs(entryTotalMinutes - manualTotalMinutes);
    
            const diffHours = diffMinutes / 60;
    
            let totalCost = 0;
            
            diffHours <= 1 ? totalCost = 20 : totalCost = 20 + Math.ceil(diffHours - 1) * 5;
    
            setResult(diffHours.toFixed(2));
            setTotal(totalCost.toFixed(2));
        }else{
            toast.info('Informe o horário de saída.')
            return;
        }
        
           
    };

    const handleManualTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManualTime(event.target.value);
    };
    
    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Encerrar pagamento</h2>
                <div className="content">
                    <div className='fields'>
                    <label htmlFor="horaEntrada">Hora de entrada:</label>
                    <input type="text" name='horaEntrada' value={car.entrada} readOnly />
                    </div>
                    <div className='fields'>
                    <label htmlFor="horaSaida">Hora de saída:</label>
                    <input type="time" name='horaSaida' value={manualTime} onChange={handleManualTimeChange} />
                    </div>
                    <button onClick={calculateDifference}>Calcular</button>
                </div>
                {result && (
                    <div className="container-result">
                        <div className="results">
                            <p className="text">* Diferença de horas: <strong>{result}</strong></p>
                            <p className="text">* Total a pagar: R$ <strong>{total}</strong></p>
                        </div>
                        <button className="btn-payment" onClick={() => onPayment(car.id)}>Finalizar pagamento</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutModal