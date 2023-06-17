"use client"
import React, { useState } from 'react';
import style from './page.modules.css';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Space, Select, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';

export default function MyForm() {
  const { TextArea } = Input;
  const { Option } = Select;
  const categorias = [
    { label: 'Computación', value: 'computacion' },
    { label: 'Electrónica Audio y Video', value: 'electronica' },
    { label: 'Consolas y Videojuegos', value: 'consolas' },
    { label: 'Celulares', value: 'celulares' },
    { label: 'Cámaras y Accesorios', value: 'camaras' },
  ];

  const subcategorias = {
    computacion: [
      'Notebook',
      'PC Escritorio',
      'Monitores',
      'Accesorios PC',
      'Sillas',
      'Componentes',
      'Impresoras',
      'Proyectores',
      'Conectividad',
      'Tablets',
      'Accesorios Tablet',
    ],
    electronica: [
      'Amplificadores',
      'Asistentes Virtuales',
      'Auriculares',
      'Equipos DJ',
      'Accesorios DJ',
      'Estudio de Grabación',
      'Grabadoras',
      'Home Theatre',
      'Megáfonos',
      'Micrófonos',
      'Parlantes',
      'Radios',
      'Sintonizador',
      'Tocadiscos',
      'Accesorios para Audio',
      'Componentes Electrónicos',
      'Drones',
    ],
    consolas: ['Consolas', 'Videojuegos', 'Accesorios'],
    celulares: ['Smartphones', 'Fundas', 'Cargadores'],
    camaras: [
      'Cámaras',
      'Cámaras filmadoras',
      'Lentes',
      'Estudios e Iluminación',
      'Cargadores y Baterías',
      'Soportes',
      'Telescopios',
      'Binoculares',
      'Microscopios',
    ],
  };

  const MyForm = () => {
    const [subcategoriaOptions, setSubcategoriaOptions] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [subcategoriaKey, setSubcategoriaKey] = useState(0);
    const [selectedSubcategoria, setSelectedSubcategoria] = useState(undefined);

    const handleCategoriaChange = (value) => {
      setSelectedCategoria(value);
      setSelectedSubcategoria(undefined);
      setSubcategoriaKey(subcategoriaKey + 1);
      setSubcategoriaOptions(subcategorias[value]);
      
      const subcategoriasFiltradas = subcategorias[value];
      setSubcategoriaOptions(subcategoriasFiltradas);
    };
    const handleSubcategoriaChange = (value) => {
      setSelectedSubcategoria(value);
    };

    return (
      <div className={style.container + ' top-1/3 '}>
        <div className="flex justify-between">
          <div>
            <h1 className={style.title}>Ingresa la información del producto</h1>
          </div>
          <div>
            <Button type="dashed">X</Button>
          </div>
        </div>
        <Form
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={(values) => valoresSubmit(values)}
        >
          <Form.Item name="Categoría" label="Categoría" rules={[{ required: true, message: 'Escoge la categoría' }]}>
            <Select
              placeholder="Selecciona la categoría"
              onChange={handleCategoriaChange}
              showSearch
              optionFilterProp="children"
              mode="single"
            >
              {categorias.map((categoria) => (
                <Option key={categoria.value} value={categoria.value}>
                  {categoria.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="Subcategoría" label="Subcategoría" rules={[{ required: true, message: 'Escoge la subcategoría' }]}>
            <Select
              key={subcategoriaKey}
              placeholder="Selecciona la subcategoría"
              showSearch
              optionFilterProp="children"
              mode="single"
              defaultValue={undefined}
              onChange={handleSubcategoriaChange}
            >
              {subcategoriaOptions.map((subcategoria) => (
                <Option key={subcategoria} value={subcategoria}>
                  {subcategoria}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <FormItem
            name="producto"
            label="Producto"
            rules={[
              { required: true, message: 'Ingresa el nombre del producto' },
            ]}
          >
            <Input placeholder="Escribe el nombre del producto" />
          </FormItem>

          <FormItem
            name="marca"
            label="Marca"
            rules={[
              { required: true, message: 'Ingresa la marca' },
            ]}
          >
            <Input placeholder="Escribe la marca" />
          </FormItem>

          <FormItem
            name="precio"
            label="Precio"
            rules={[
              {
                required: true,
                message: 'Ingresa el precio',
              },
            ]}
          >
            <Input type="number" name="precio" placeholder="Escribe el precio" />
          </FormItem>

          <FormItem
            name="ubicacion"
            label="Ubicación"
            rules={[
              { required: true, message: 'Ingresa la cuidad' },
            ]}
          >
            <Input placeholder="Escribe la cuidad" />
          </FormItem>

          <Form.Item
            name="direccion"
            label="Direccion"
            rules={[
              { required: true, message: 'Ingresa la dirección' },
            ]}
          >
            <Space direction="vertical" size={16}>
              <Input type="string" name="direccion" placeholder="Escribe la dirección" />
              <Input type="number" name="codigo" placeholder="Escribe el código postal" />
            </Space>
          </Form.Item>

          <Form.Item label="Estado">
            <Radio.Group>
              <Radio value="usado"> Usado </Radio>
              <Radio value="nuevo"> Nuevo </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Descripción">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Imagen" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>

          <Button htmlType="submit" className={style.Button}>
            Publicar
          </Button>
        </Form>
      </div>
    );
  };

  return <MyForm />;
}