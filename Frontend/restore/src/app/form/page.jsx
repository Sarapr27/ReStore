"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  const [form, setForm] = useState({
    
    subcategoria: "",
    name: "",
    Marca: "",
    Ubicacion: {
      ciudad: "",
      direccion: "",
      codigoPostal: ""
    },
    state: "",
    precio: 0,
    Description: "",
    background_image: ""
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setForm(data);
    alert("¡Formulario enviado con éxito!");
  };

  return (
    <div>
      <div>
        <h1>Ingresa la información de tu producto</h1>
      </div>
      <form class="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <b>Categoría:</b>
          <br />
          <select {...register("categoria", { required: true })}>
            <option value="">Elige la categoría</option>
          </select>
          {errors.categoria && <span> La categoría es requerida</span>}
        </div>
        <br />
        <div>
          <b>Subcategoría:</b>
          <br />
          <select {...register("subcategoria", { required: true })}>
            <option value="">Elige la subcategoría</option>
          </select>
          {errors.subcategoria && <span> La subcategoría es requerida</span>}
        </div>
        <br />
        <div>
          <b>Nombre del producto:</b> <br />
          <input type="text" {...register("name", { required: true })} class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name" />
          {errors.marca && <span> El nombre es requerido</span>}
        </div>
        <br />
        <div>
          <b>Marca:</b> <br />
          <input type="text" {...register("marca", { required: true })} />
          {errors.marca && <span> La marca es requerida</span>}
        </div>
        <br />
        <div>
          <b>Ubicación: </b> <br />
          <input type="text" {...register("ciudad", { required: true })} placeholder="Ciudad" style={{ marginRight: '10px' }}/>
          <input type="text" {...register("direccion", { required: true })} placeholder="Dirección" style={{ marginRight: '10px' }}/>
          <input type="number" {...register("codigo", { required: true })} placeholder="Código postal"/>
          {errors.marca && <span> Los datos de ubicación son requeridos</span>}
        </div>
        <br />
        <div>
          <label><b>Estado:</b></label>
          <br />
          <label>
            <input type="radio" {...register("estado", { required: true })} value="nuevo" /> Nuevo
          </label>
          <br />
          <label>
            <input type="radio" {...register("estado", { required: true })} value="usado" /> Usado
          </label>
          {errors.estado && <span> El estado es requerido</span>}
        </div>
        <br />
        <div>
          <label><b>Precio:</b></label>
          <br />
          <input type="number" {...register("precio", { required: true })} />
          {errors.precio && <span> El precio es requerido</span>}
        </div>
        <br />
        <div>
          <label><b>Descripción:</b></label>
          <br />
          <input type="text" {...register("descripcion", { required: true })} />
          {errors.descripcion && <span> La descripción es requerida</span>}
        </div>
        <br />
        <div>
          <label><b>Imagen del producto:</b></label>
          <br />
          <input type="text" {...register("imagen", { required: true })} />
          <button>Subir imagen</button>
          {errors.imagen && <span> La imagen es requerida</span>}
        </div>

        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Form;

