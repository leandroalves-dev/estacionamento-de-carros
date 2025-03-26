import React, { useEffect, useState } from 'react'




import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IServices } from '../Interfaces/IServices';

import ListServices from './ListServices';
import Modal from '../Modal/Modal';
import CheckoutModal from '../Modal/CheckoutModal';
import Container from '../Container/Container';

type ModalType = 'none' | 'edit' | 'checkout';

const RegisterServices = () => {

  const [modelo, setModelo] = useState<string>('');
  const [placa, setPlaca] = useState<string>('');
  const [entrada, setEntrada] = useState<string>(new Date().toLocaleTimeString());
  const [checkoutCar, setCheckoutCar] = useState<IServices | null>(null);
  
  const [cars, setCars] = useState<IServices[]>([]);

  const [modalOpen, setModalOpen] = useState<ModalType>('none')
  const [currentTitle, setCurrentTitle] = useState<IServices | null>(null);

  useEffect(() => {
    setInterval( () => {
        setEntrada(new Date().toLocaleTimeString())
    },1000)
  },[]);

  useEffect(() => {
    const storedCars = localStorage.getItem('MyCars');
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    }
  }, []);

  useEffect( () => {

    cars.length > 0 ? localStorage.setItem('MyCars', JSON.stringify(cars)) : localStorage.removeItem('MyCars')
 
  }, [cars])

  const validateCar = (placa: string) => {
    const regex = /^[A-Z/a-z]{3}-\d{4}$/;
    return regex.test(placa)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if(modelo === '' || placa === ''){
      toast.error('Preecha todos os campos')
    }else{
      
      if(cars.some(carPlaca => carPlaca.placa === placa )){
          toast.info('Essa placa já foi registrada. Favor tente novamente!');
          setTimeout( () => {
            setPlaca('')
          },2000)
          return
      }else{
        if(!validateCar(placa)){
          toast.error('Placa inválida. o formato deve ser ABC-1234')
        }else{
          
          const newCar = { id: Date.now(), modelo, placa, entrada, isEditing: false}
          setCars([...cars, newCar])
          setModelo('');
          setPlaca('');
        }
      }

    }

    console.log(cars)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if( currentTitle ){ 
      const { name, value } = e.target
      setCurrentTitle({...currentTitle, [name]: value}) 
      console.log('currentTitle', currentTitle)
    }
   
  }

  const handleMasc = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.replace(/[^a-zA-Z0-9-]/g, '');

    const letter = value.substring(0, 4).replace(/[^a-zA-Z]/g, '');
    const number = value.substring(4, 8).replace(/[^0-9]/g, '');

    setPlaca(`${letter}-${number}`)
  }

  const handleEdit = (modelo: IServices) => {
      setCurrentTitle(modelo)
      setModalOpen('edit')
  }

  const handleSave = () => {

      if( currentTitle ){

        setCars(cars.map(car => car.id === currentTitle.id ? currentTitle : car))
        
        if(cars.some(carPlaca => carPlaca.placa === currentTitle.placa )){
          toast.info('Essa placa já foi registrada. Favor tente novamente!')
          return
        }else{
          if(!validateCar(currentTitle.placa)){
            toast.error('Placa inválida. o formato deve ser ABC-1234')
            return;
          }else{
            setModalOpen('none')
          }
        }
        
      }

  }

  const handleCheckout = (car: IServices) => {
    setCheckoutCar(car);
    setModalOpen('checkout')
  };

  const closeModal = () => {
    setModalOpen('none');
  }

  const endPayment = (id: number) => {
    setCars(cars.filter(car => car.id !== id))
    setModalOpen('none');
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1200} pauseOnHover={false} />
      
      <div className="bg-neutral-800 p-6 border-t-neutral-700 border-1">
          <Container>

            <form onSubmit={handleSubmit} className='flex flex-row w-full gap-3 max-w-[860px] mx-auto max-sm:flex-col max-sm:gap-0'>
              <div className='flex flex-col mb-2 w-full'>
                <label htmlFor="modelo" className='text-neutral-500'>Modelo do Veículo</label>
                <input className='uppercase border border-neutral-700 h-12 w-full p-2 focus:outline-none text-neutral-400 font-normal' type="text" name='modelo' value={modelo} onChange={(e) => setModelo(e.target.value)} />
              </div>
              <div className='flex flex-col mb-2 w-full'>
                <label htmlFor="placa" className='text-neutral-500'>Placa do Veículo</label>
                <input className='uppercase border border-neutral-700 h-12 w-full p-2 focus:outline-none text-neutral-400 font-normal' type="text" name='placa' value={placa} onChange={handleMasc}  />
              </div>
              <div className='flex flex-col mb-2 w-full'> 
                <label htmlFor="entrada" className='text-neutral-500'>Hora de Entrada</label>
                <input className='uppercase border border-neutral-700 h-12 w-full p-2 focus:outline-none text-white' type="text" name='entrada' value={entrada} readOnly  />
              </div>
              <button className='bg-neutral-700 text-neutral-900 h-12 mt-6 p-3 pr-6 pl-6 cursor-pointer'>Registrar</button>
            </form>
            {cars.length > 0 && <p className='bg-neutral-800 text-neutral-600 absolute top-10 right-10 p-1 pr-3 pl-3 rounded'>{cars.length}</p>}

          </Container>
      </div>

      <ListServices myCars={cars} onEdit={handleEdit} onCheckout={handleCheckout} />      

      {modalOpen === 'edit' && currentTitle &&  (
        <Modal onClose={closeModal} currentTitle={currentTitle} onChange={handleChange} onSave={handleSave} />
      )}
      {modalOpen === 'checkout' && checkoutCar && (
        <CheckoutModal car={checkoutCar} onClose={closeModal} onPayment={endPayment} />
      )}
    </>
  )
}

export default RegisterServices