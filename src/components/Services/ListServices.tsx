import { IServices } from '../Interfaces/IServices'
import './ListServices.css'

interface PropsServices {
  myCars: IServices[];
  onEdit: (modelo: IServices) => void;
  onCheckout: (car: IServices) => void;
}

const ListServices = ({ myCars, onEdit, onCheckout }: PropsServices) => {
  return (
    <div className="listRegister">
        {myCars.length === 0 ? (
          <h2>Não temos veículos no pátio</h2>
        ) : (
          
          <div className='container'>
            <div className='list list-title'>
                <span><i className="bi bi-car-front"></i> Modelo do veículo</span>
                <span><i className="bi bi-memory"></i> Placa do veículo</span>
                <span><i className="bi bi-clock-history"></i> Hora de entrada</span>
                <span><i className="bi bi-cash-coin"></i> Encerrando o período</span>
            </div>
          
            {myCars.map(car => (
              <div key={car.id} className='list'>
                  <span>{car.modelo}</span>
                  <span>{car.placa}</span>
                  <span>{car.entrada}</span>
                  <span className='btns'>
                    <button onClick={() => onEdit(car)}>Editar</button>
                    <button onClick={() => onCheckout(car)}>Encerrar</button>
                  </span>
              </div>
            ))}
           
          </div>
        )}
      </div>
  )
}

export default ListServices