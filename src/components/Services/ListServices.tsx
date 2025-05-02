//Interface
import { IServices } from '../Interfaces/IServices'

//components
import Container from '../Container';
import Loading from '../Loading';

interface PropsServices {
    myCars: IServices[];
    onEdit: (modelo: IServices) => void;
    onCheckout: (car: IServices) => void;
    loading: boolean;
}

const ListServices = ({ myCars, onEdit, onCheckout, loading }: PropsServices) => {

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : myCars.length === 0 ? (
                <div className='flex flex-col justify-center items-center bg-white/20 backdrop-blur-md min-h-[calc(100vh-355px)]'>
                    <h2 className='mt-6 mb-6 text-center text-2xl text-white'>Não temos veículos no pátio</h2>
                </div>
            ) : (
                <>
                    {myCars.map( (car, index) => (
                        <div className="w-full mt-1 mb-1 grid grid-cols-4 gap-3 max-sm:px-6" key={index}>
                            <div className="grid gap-3">
                                {index === 0 && (
                                    <span className="bg-white/20 text-lg backdrop-blur-md w-full p-5 text-white hidden sm:block">
                                        <i className="bi bi-car-front mr-2"></i> Modelo do veículo
                                    </span>
                                )}
                                <span className="uppercase bg-neutral-700/20 backdrop-blur-md w-full border border-neutral-600 text-white/80 p-3 px-4 max-sm:text-[10px]">{car.modelo}</span>
                            </div>
                        
                            <div className="grid gap-3">
                                {index === 0 && (
                                    <span className="bg-white/20 text-lg backdrop-blur-md w-full p-5 text-white hidden sm:block">
                                        <i className="bi bi-memory mr-2"></i> Placa do veículo
                                    </span>
                                )}
                                <span className="uppercase bg-neutral-700/20 backdrop-blur-md w-full border border-neutral-600 text-white/80 p-3 px-4 max-sm:text-[10px]">{car.placa}</span>
                            </div>
                        
                            <div className="grid gap-3">
                                {index === 0 && (
                                    <span className="bg-white/20 text-lg backdrop-blur-md w-full p-5 text-white hidden sm:block">
                                        <i className="bi bi-clock-history mr-2"></i> Hora de entrada
                                    </span>
                                )}
                                <span className="uppercase bg-neutral-700/20 backdrop-blur-md w-full border border-neutral-600 text-white/80 p-3 px-4 max-sm:text-[10px]">{car.entrada}</span>
                            </div>
                        
                            <div className="grid gap-3"> 
                                {index === 0 && (
                                    <span className="bg-white/20 text-lg backdrop-blur-md w-full p-5 text-white hidden sm:block">
                                        <i className="bi bi-cash-coin mr-2"></i> Encerrando o período
                                    </span>
                                )}
                                <span className="flex w-full gap-2 max-sm:flex-col">
                                    <button className="bg-sky-400/40 backdrop-blur-md w-full text-neutral-300 h-12.5 cursor-pointer max-sm:h-7 max-sm:text-[10px]" onClick={() => onEdit(car)}>Editar</button>
                                    <button className="bg-sky-400/40 backdrop-blur-md w-full text-neutral-300 h-12.5 cursor-pointer max-sm:h-7 max-sm:text-[10px]" onClick={() => onCheckout(car)}>Encerrar</button>
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