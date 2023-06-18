import React from 'react';
import { fetchCategories } from './fetch';
import ProductsContainer from '../components/ProductsContainer/ProductsContainer';
import { Navbar } from '../components/navbar/navbar';
import Carousel from '../components/carousel/Carousel';
import { AiFillCamera } from 'react-icons/ai';
import { GrPersonalComputer } from 'react-icons/gr';
import { MdHeadset, MdVideogameAsset } from 'react-icons/Md';
import { IoIosTabletPortrait } from 'react-icons/Io';
import { ImDisplay } from 'react-icons/Im';
// import style from './page.module.css';
import Link from 'next/link';

async function Home() {
  const data = await fetchCategories();
  const ubicaciones = [...new Set(data.result.map(producto => producto.Ubicacion))];
  const marcas = [...new Set(data.result.map(producto => producto.Marca))];
  const estado = [...new Set(data.result.map(producto => producto.state))];

  return (
    <>
      <Navbar />
      <Carousel />
      <div className='mx-auto container px-4'>
        <div className='flex align-middle justify-center gap-16 py-8 flex-wrap '>
          <Link
            title='click to visit ConsolasyVideojuegos'
            href={'/home/ConsolasyVideojuegos'}
          >
            <MdVideogameAsset fontSize={50} />
          </Link>
          <Link title='click to visit TV' href={'/home/TV'}>
            <ImDisplay fontSize={50} />
          </Link>
          <Link title='click to visit Celulares' href={'/home/Celulares'}>
            <IoIosTabletPortrait fontSize={50} />
          </Link>
          <Link
            title='click to visit ElectronicaAudioVideo'
            href={'/home/ElectronicaAudioVideo'}
          >
            <MdHeadset fontSize={50} />
          </Link>
          <Link title='click to visit Computacion' href={'/home/Computacion'}>
            <GrPersonalComputer fontSize={50}></GrPersonalComputer>
          </Link>{' '}
          <Link
            title='click to visit CamarasyAccesorios'
            href={'/home/CamarasyAccesorios'}
          >
            <AiFillCamera fontSize={50}></AiFillCamera>
          </Link>
        </div>
        <h2 className='text-4xl text-center mb-4 font-medium text-blue-900'>
          {' '}
          Ofertas Limitadas!
        </h2>
        <ProductsContainer data={data} ubicaciones={ubicaciones} marcas={marcas} estado={estado}/>
      </div>
      </>
  );
}

export default Home;
