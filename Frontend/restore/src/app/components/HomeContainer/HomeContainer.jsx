'use client';
import React from 'react';
import Card from '../card/card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRouter } from "next/navigation";
import { useSession,signOut } from "next-auth/react";
import { useEffect, useState } from 'react';
import axios from "axios"
import Swal from 'sweetalert2';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function HomeContainer({ data }) {
  
  
  const { data: session, status } = useSession();
const [email,setEmail] = useState(null)
const [isBan, setBan] = useState(null)
const fetchEmail = async () => {
const {data} = await axios.get(`https://re-store.onrender.com/users/${email}/email`)
if (data.ban === true) {
  setBan(true)
}
}

useEffect(() => {
  if (session) {
    console.log(session);
    setEmail(session.user.email);
  }
}, [session]);

useEffect(() => {
  if (email) {
    fetchEmail();
  }
}, [email]);

useEffect(() => {
  if (isBan) {
    Swal.fire({
      icon: 'error',
      title: '¡Estás baneado!',
      text: 'Estás baneado hasta nuevo aviso. No podrás iniciar sesión.',
    });
    signOut()
  }
}, [isBan]);



const filteredData = data.result.filter(product => product.Disabled !== true)
  
  
  
  return (
    <Carousel responsive={responsive}>
      {filteredData.map((props) => {
        return (
          <Card
            name={props.name}
            precio={props.precio}
            estado={props.state}
            marca={props.Marca}
            oferta={props.Ofertas}
            subcategoria={props.subcategoria}
            key={props._id}
            id={props._id}
            image={props.background_image}
            discount={props.Ofertas}
            ubicacion={props.Ubicacion}
            Disabled={props.Disabled}
          />
        );
      })}
    </Carousel>
  );
}

export default HomeContainer;
