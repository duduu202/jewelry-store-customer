
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "../../Home/styles";
import Navbar from "../../../components/Navbar/Navbar";
import { Container } from "../../../styles/style";
import GenericCreate from "../../../components/GenericCreate/GenericCreate";
import { Address, User } from "../../../hooks/useAuth";
import api from "../../../services/api";


const UserCreatePage = () => {
    //const { data } = await api.get('/user');
    //console.log("data",data.results)
    const [ userData, setUserData ] = useState<User>();
    const [ addresses, setAddresses ] = useState<Address>()
    
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const { data: userData } = await api.get<User>('/user/'+id);
            console.log("userData", userData);
            setUserData(userData);

            // const { data: addressData } = await api.get<IPaginatedResponse<Address>>('/address/?page=1&limit=10');
            // console.log("addressData", addressData);
            if(userData?.address){
                setAddresses(userData?.address[0]);
            }

            setLoading(false);
        }
        fetchData();
    }, []);



    return (
      <PageContainer>
        <Navbar />
        <Container>
        <h2>Editar</h2>
        <h3>Usuário</h3>
        {/* <GenericCreate column_names={['nome']} data={} /> */}
        <GenericCreate object={{
            name: userData?.name,
            email: userData?.email,
            CPF: userData?.CPF,
            phone: userData?.phone,
            password: userData?.password,
        }} route={'/user'} />
        {/* <h3>Endereço</h3> */}
        {/* <GenericCreate object={{
            street: addresses?.street,
            number: addresses?.number,
            district: addresses?.district,
            city: addresses?.city,
            state: addresses?.state,
            zip_code: addresses?.zip_code,
        }} route={'/address/'+addresses?.id} /> */}

        </Container>
      </PageContainer>
    );
}

/*
        {
                        keys?.map((key) => {
                            return (
                                <div>
                                    <label>{key}</label>
                                    <input type="text" value={data?.[key]} />
                                </div>
                            )
                        })
        }
*/

export default UserCreatePage;
