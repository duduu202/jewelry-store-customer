import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import handleError from "../../utils/message";
import { Input } from "../Input/Input";
import { ButtonComponent } from "../Button/styles";

interface IProps {
  handleSave: (object: any) => void;
  id?: string;
  route: string;
  /**
   * Object keys to be displayed on the editor
   *
   * @example
   * objectKeys: {
   * name: 'Nome',
   * stock: 'Estoque',
   * price: 'Preço',
   * description: 'Descrição'
   * }
   */
  objectKeys: {
    [key: string]: string;
  };
}

const Editor = (props: IProps) => {
  const { id, route } = props;
  const [productData, setProductData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setProductData(undefined);
        setLoading(false);
        return;
      }
      try {
        const { data: productData } = await api.get<any>(`${route}/${id}`);
        setProductData(productData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({
      ...productData,
      [event.target.title]: event.target.value,
    });
  };

  const handleSave = async () => {
    if (!productData) {
      return;
    }
    console.log("productData", productData);
    if (productData.image) {
      delete productData.image;
    }
    try {
      props.handleSave(productData);
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{id ? "Editar" : "Criar"}</h2>
      {Object.keys(props.objectKeys).map((key) => {
        if (key === "image") {
          return (
            <Input
              type="file"
              label={props.objectKeys[key]}
              iconName={key}
              placeholder={key}
              value={productData ? productData[key] : ""}
              onChange={(e) => handleChange(e)}
            />
          );
        }
        return (
          <Input
            type="text"
            label={props.objectKeys[key]}
            iconName={key}
            placeholder={key}
            value={productData ? productData[key] : ""}
            onChange={(e) => handleChange(e)}
          />
        );
      })}

      {/* <Input type="text" label="Nome" iconName="object" placeholder="name" value={productData? productData.name : ''} onChange={e => handleChange(e)} /> */}
      {/* <Input type="text" label="Estoque" iconName="product" placeholder="stock" value={productData? productData.stock : ''} onChange={e => handleChange(e)} /> */}
      {/* <Input type="text" label="Preço" iconName="price" placeholder="price" value={productData? productData.price : ''} onChange={e => handleChange(e)} /> */}
      {/* <Input type="text" label="Descrição" iconName="description" placeholder="description" value={productData? productData.description : ''} onChange={e => handleChange(e)} /> */}

      <ButtonComponent onClick={() => handleSave()}>Salvar</ButtonComponent>
    </div>
  );
};

export default Editor;
