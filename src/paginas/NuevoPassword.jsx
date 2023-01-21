import { useState, useEffect } from "react"
import { useParams, Link } from 'react-router-dom';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios"

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [ alerta,setAlerta ] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const { token } = useParams();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(password.length < 6){
        setAlerta({
            msg: 'El password debe contener minimo 6 caracteres',
            error: true
        })
        return;
    }

    try {
        const url = `/veterinarios/olvide-password/${token}`;
        const {data} = await clienteAxios.post(url, {
            password
        })

        setAlerta({
            msg: data.msg
        })
        setPasswordModificado(true);
    } catch (error) {
        setAlerta({
            msg: error.response.data.msg,
            error: true
        })
    }
  }

  useEffect(() => {
    const comprobarToken = async() => {
        try {
            await clienteAxios(`/veterinarios/olvide-password/${token}`)
            setAlerta({
                msg: 'Coloca tu nuevo password'
            })
            setTokenValido(true);
        } catch (error) {
            setAlerta({
                msg: 'Hubo un error con el enlace',
                error: true
            })
        }
    }
    comprobarToken();
  }, []);

  const { msg } = alerta;
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu Password y no pierdas el Acceso a tus {""} <span className="text-black">Pacientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 roundex-sl bg-white'>
            {msg && <Alerta alerta={alerta}/>}
            {tokenValido && (
                <>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">
                            Nuevo Password
                            </label>
                            <input type="password" className="border w-full p-3 rounded-xl mt-3 bg-gray-50" placeholder="Tu Nuevo Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <input type="submit" value="Guardar Nuevo Password" className="bg-indigo-700 text-white w-full py-3 px-10 rounded-xl uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
                    </form>
                </>
            )}
            
            {passwordModificado && (
                <Link to="/" className='block text-center my-5 text-gray-500'>Iniciar Sesión</Link>
            )}

        </div>
    </>
  )
}

export default NuevoPassword