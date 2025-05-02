import { useState } from "react";


import { IServices } from "../Interfaces/IServices";
import { toast } from "react-toastify";

//components
import Input from "../Input/Input";

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
        if (manualTime) {
            const [hourEntry, minuteEntry] = car.entrada.split(':').map(Number);
            const [manualHours, manualMinutes] = manualTime.split(':').map(Number);
    
            // Criação dos objetos Date considerando que a entrada e a saída são em dias diferentes
            const entryDate = new Date();
            entryDate.setHours(hourEntry, minuteEntry, 0, 0); // define hora e minutos da entrada
            
            // A data de saída precisa ser ajustada, se a hora de saída for menor que a de entrada, vamos adicionar 1 dia
            const exitDate = new Date();
            exitDate.setHours(manualHours, manualMinutes, 0, 0); // define hora e minutos da saída
            
            // Se a hora de saída for antes da entrada, somamos 24 horas (1 dia)
            if (exitDate < entryDate) {
                exitDate.setDate(exitDate.getDate() + 1);
            }
    
            // Calcular a diferença em milissegundos e depois em minutos
            const diffMilliseconds = exitDate.getTime() - entryDate.getTime();
            const diffMinutes = Math.abs(diffMilliseconds / 60000); // Convertendo milissegundos para minutos
    
            // Calculando horas arredondadas
            const diffHours = Math.ceil(diffMinutes / 60); // Arredonda para cima, considerando horas completas
    
            let totalCost = 0;
    
            if (diffHours <= 1) {
                totalCost = 20; // Custo fixo para até 1 hora
            } else {
                totalCost = 20 + Math.ceil(diffHours - 1) * 5; // Custo adicional por hora após a primeira
            }
    
            setResult(diffHours.toFixed(2));
            setTotal(totalCost.toFixed(2));
        } else {
            toast.info('Informe o horário de saída.');
            return;
        }
    };
    

    const handleManualTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManualTime(event.target.value);
    };
    
    return (
        <div className="fixed z-10 inset-0 flex justify-center items-center bg-neutral-800 max-sm:px-4" style={{ display: 'flex', backgroundColor: 'rgba(31, 41, 55, 0.9)' }}>
            <div className="relative bg-white max-w-[600px] w-full p-6">
                <span className="absolute top-2 right-3 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-neutral-900 text-center mb-4 text-2xl font-bold">Encerrar pagamento</h2>
                <div className="flex flex-row gap-4 max-sm:gap-1">
                    <Input type="text" label="Hora de entrada:" name="horaEntrada" value={car.entrada}  />
                    <Input type="time" label="Hora de saída:" name="horaSaida" value={manualTime} onChange={handleManualTimeChange}  />
                    <button className="bg-sky-400/40 backdrop-blur-md h-10 text-neutral-800 pr-6 pl-6 mt-6 cursor-pointer max-sm:mt-4" onClick={calculateDifference}>Calcular</button>
                </div>
                {result && (
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex flex-row gap-3">
                            <p className="text-green-600">* Diferença de horas: <strong>{result}</strong></p>
                            <p className="text-green-600">* Total a pagar: R$ <strong>{total}</strong></p>
                        </div>
                        <button className="bg-green-500 text-white py-2 px-2 cursor-pointer" onClick={() => onPayment(car.id)}>Finalizar pagamento</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutModal