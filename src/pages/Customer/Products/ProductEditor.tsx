import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PageContainer } from "../../Home/styles";
import Navbar from "../../../components/Navbar/Navbar";
import { Container } from "../../../styles/style";
import GenericEdit from "../../../components/GenericEdit/GenericEdit";
import api from "../../../services/api";
import { Input } from "../../../components/Input/Input";
import handleError from "../../../utils/message";
import { ButtonComponent } from "../../../components/Button/styles";
import { IProductDTO } from "./dto/ProductDTO";



const route = '/product';

interface IProps {
  handleSave: (user: IProductDTO) => void;
  id?: string;
}

const ProductEditor = (props: IProps) => {
  const { id } = props;
  const [productData, setProductData] = useState<IProductDTO>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if(!id){
        setProductData(undefined);
      }
      try {
        const { data: productData } = await api.get<IProductDTO>(route + '/' + id);
        setProductData(productData);

        console.log("productData", productData);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    console.log("event.target.placeholder", event.target.placeholder);
    setProductData({ ...productData, [event.target.placeholder]: event.target.value });

  }

  const handleSave = async () => {
    if(!productData){
      return;
    }
    if(!productData.description){
      productData.description = undefined;
    }
    try {
      props.handleSave(productData);
    } catch (error) {
      handleError(error);
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return (
    <div>
        <h2>{id? 'Editar' : 'Criar'} produto</h2>
        <Input type="text" label="Nome" iconName="user" placeholder="name" value={productData? productData.name : ''} onChange={e => handleChange(e)} />
        <Input type="text" label="Estoque" iconName="product" placeholder="stock" value={productData? productData.stock : ''} onChange={e => handleChange(e)} />
        <Input type="text" label="Preço" iconName="price" placeholder="price" value={productData? productData.price : ''} onChange={e => handleChange(e)} />
        <Input type="text" label="Descrição" iconName="description" placeholder="description" value={productData? productData.description : ''} onChange={e => handleChange(e)} />


        <ButtonComponent onClick={() => handleSave()}>Salvar</ButtonComponent>

    </div>

  );
};

export default ProductEditor;
