//Interface
import { IServices } from '../Interfaces/IServices'

//components
import Container from '../Container/Container';

interface PropsServices {
  myCars: IServices[];
  onEdit: (modelo: IServices) => void;
  onCheckout: (car: IServices) => void;
}

const ListServices = ({ myCars, onEdit, onCheckout }: PropsServices) => {
  return (
    <Container>
        {myCars.length === 0 ? (
          <div className='h-72 flex flex-col justify-center items-center'>
            <h2 className='mt-6 mb-6 text-center font-bold text-2xl'>Não temos veículos no pátio</h2>
          </div>
        ) : (
          
          <>
				{myCars.map( (car, index) => (
					<div className="w-full mt-4 mb-4 grid grid-cols-4 gap-3 max-sm:px-6">
						<div className="grid gap-3">
							{index === 0 && (
								<span className="bg-neutral-900 w-full p-5 text-white hidden sm:block">
									<i className="bi bi-car-front mr-2"></i> Modelo do veículo
								</span>
							)}
							<span className="uppercase bg-neutral-100 w-full text-neutral-800 p-4 max-sm:text-sm">{car.modelo}</span>
						</div>
					
						<div className="grid gap-3">
							{index === 0 && (
								<span className="bg-neutral-900 w-full p-5 text-white hidden sm:block">
									<i className="bi bi-memory mr-2"></i> Placa do veículo
								</span>
							)}
							<span className="uppercase bg-neutral-100 w-full text-neutral-800 p-4 max-sm:text-sm">{car.placa}</span>
						</div>
					
						<div className="grid gap-3">
							{index === 0 && (
								<span className="bg-neutral-900 w-full p-5 text-white hidden sm:block">
									<i className="bi bi-clock-history mr-2"></i> Hora de entrada
								</span>
							)}
							<span className="uppercase bg-neutral-100 w-full text-neutral-800 p-4 max-sm:text-sm">{car.entrada}</span>
						</div>
					
						<div className="grid gap-3"> 
							{index === 0 && (
								<span className="bg-neutral-900 w-full p-5 text-white hidden sm:block">
									<i className="bi bi-cash-coin mr-2"></i> Encerrando o período
								</span>
							)}
							<span className="flex w-full gap-2 max-sm:flex-col">
								<button className="bg-neutral-400 w-full text-gray-800 h-14 cursor-pointer max-sm:h-7 max-sm:text-sm" onClick={() => onEdit(car)}>Editar</button>
								<button className="bg-neutral-400 w-full text-gray-800 h-14 cursor-pointer max-sm:h-7 max-sm:text-sm" onClick={() => onCheckout(car)}>Encerrar</button>
							</span>
						</div>
					</div>
				
				))}
               
            </>
            
          )}
      </Container>
  )
}

export default ListServices