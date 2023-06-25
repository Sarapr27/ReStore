'use client';
import { fetchDetail } from '../../fetch';
import Image from 'next/image';
import Boton from '@/app/components/Button/Button';
import BackButton from '@/app/components/backButton/BackButton';
import NotFound from './notFound';
import { addToCart } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '@/app/components/loader/Loader';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function DetailId({ param }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const { data: session, status } = useSession();
  const [post, setPost] = useState({ result: [] });
  const [onCart, setOnCart] = useState(false);

  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  }, [addedToCart]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Detail/${param}`
      );
      setPost(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!addedToCart) {
      if (cart.some((cartItem) => cartItem._id === param)) setOnCart(true);
    }
  }, [addedToCart]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    //DESPACHAR A CART SOLO {productId: post.result[0]._id}
    //Y armar desp el objeto con la cantidad tambien
    return dispatch(
      addToCart(post.result[0]._id, session?.user.id, post.result[0].precio)
    );
  };

  if (post.message) return <NotFound />;

  const calculateDiscountedPrice = () => {
    if (post?.result[0]?.Ofertas && post.result[0].precio) {
      const descuento = parseFloat(post.result[0].Ofertas) / 100;
      const precio = parseFloat(post.result[0].precio);
      const precioConDescuento = precio - precio * descuento;
      return precioConDescuento.toFixed(2);
    }
    return null;
  };

  const precioConDescuento = calculateDiscountedPrice();

  return (
    <div className='container mx-auto px-4 my-8'>
      {!post.result[0] ? (
        <Loader />
      ) : (
        <div>
          <BackButton />
          <div className='grid md:grid-cols-2 gap-4 mb-12 mt-4'>
            <div className='relative rounded-lg aspect-square shadow-md shadow-slate-200 md:justify-self-center '>
              <Image
                className='aspect-square rounded-lg object-contain'
                src={post.result[0].background_image}
                alt={post.result[0].name}
                fill
              />
            </div>
            <div className='grid gap-4 text-gray-600'>
              <h2 className='text-xl font-semibold text-blue-900'>
                {post.result[0].name} {post.result[0].Marca}
              </h2>
              <p className=''>Ubicacion : {post.result[0].Ubicacion}</p>
              <p className=''>Estado: {post.result[0].state}</p>

              {precioConDescuento ? (
                <p className='font-medium text-base text-slate-500'>
                  Precio:{' '}
                  <span className='text-red-400 line-through'>
                    ${post.result[0].precio}
                  </span>{' '}
                  <span className='text-slate-800'>${precioConDescuento}</span>
                </p>
              ) : (
                <p className='font-medium text-base text-slate-800'>
                  Precio: ${post.result[0].precio}
                </p>
              )}
              <h3 className=''>
                Calificación del vendedor : <img src='' alt='' />5
              </h3>
              <p className='text-blue-900 text-xl font-semibold'>
                Precio: ${post.result[0].precio}
              </p>
              <div>
                <label className='block mb-2'>Método de envio :</label>
                <select
                  className='cursor-pointer py-1 px-2 rounded-lg bg-slate-300    text-slate-800 font-medium'
                  name='metodo'
                  id='envio'
                >
                  <option value='1'>Opción 1</option>
                  <option value='2'>Opción 2</option>
                </select>
              </div>
              <div className='flex gap-4 align-middle'>
                <span className='justify-self-start'>
                  <Boton
                    onClick={() => handleAddToCart()}
                    text={'Añadir al carrito'}
                  >
                    Añadir al carrito
                  </Boton>
                </span>
                {addedToCart ? (
                  !onCart ? (
                    <p className='self-center font-medium text-green-500'>
                      Agregado exitósamente
                    </p>
                  ) : (
                    <p className='self-center font-medium text-red-500'>
                      Ya agregaste este producto al carrito
                    </p>
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div className='grid  gap-4 mb-8'>
            <div className='grid gap-2'>
              <h3 className='text-blue-900 text-xl font-medium'>
                Descripción:{' '}
              </h3>
              <p className='text-gray-600 leading-normal text-sm'>
                {post.result[0].Description}
              </p>
            </div>
            <div className='grid gap-2'>
              <h3 className='text-xl font-semibold text-blue-900'>
                También te puede interesar:
              </h3>
              <img
                className=''
                src='https://i.stack.imgur.com/t0k67.png'
                alt='imagen referencial'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
