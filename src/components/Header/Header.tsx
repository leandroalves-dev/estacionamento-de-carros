import { useEffect, useState } from "react";
import Container from "../Container"
import { IServices } from "../Interfaces/IServices";

const Header = () => {

    const [cars, setCars] = useState<IServices[]>([]); 
    const total = 100;

    useEffect(() => {
        const loadCars = () => {
            const storedCars = localStorage.getItem('MyCars');
            if (storedCars) {
                setCars(JSON.parse(storedCars));
            }
        };
    
        loadCars(); 
    
        window.addEventListener('carsUpdated', loadCars); 
    
        return () => {
            window.removeEventListener('carsUpdated', loadCars); 
        };
    }, []);


    const qtdaTotal = total - cars.length;

    return (
        <Container>
            <header className='flex items-center justify-between h-32'>
                <div>
                    <img src="./logomarca.png" alt="" />
                </div>
                <div className="flex gap-3 text-white">
                    <div className="flex flex-col items-center justify-center">
                        <span className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white/20 flex justify-center items-center w-16 h-16">{qtdaTotal}</span>
                        <p>Vagas</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="rounded-full bg-sky-400/40 backdrop-blur-md border-2 border-white/20 flex justify-center items-center w-16 h-16">{cars.length}</span>
                        <p>Ocupadas</p>
                    </div>
                </div>
            </header>
        </Container>
    )
}

export default Header