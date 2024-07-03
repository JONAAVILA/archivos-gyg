import emailjs from 'emailjs-com';
import { useState } from 'react'
import validate from './validate'
import './Form.css';

export default function Form({servisId,templateId,userId}){

    const [ prueba, setPrueba ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ alert, setAlert ] = useState('')
    const [ inputValue, setInputValue ] = useState({
        name: '',
        surname:'',
        email:'',
        phone:'',
        message:''
    })

    const handleInputValue = (event)=>{
        const { id, value } = event.target
        const validateError = validate({[id]:value})

        if(validateError) setErrors(prevErrors => ({
            ...prevErrors,
            [id]: validateError ? validateError[id] : null
        }))

        if(id === 'name' && validateError){
            setInputValue(prevSetInputValue => ({
                ...prevSetInputValue,
                name:value
            }))
        }
        if(id === 'surname' && validateError){
            setInputValue(prevSetInputValue => ({
                ...prevSetInputValue,
                surname:value
            }))
        }
        if(id === 'email' && validateError){
            setInputValue(prevSetInputValue => ({
                ...prevSetInputValue,
                email:value
            }))
        }
        if(id === 'phone' && validateError){
            setInputValue(prevSetInputValue => ({
                ...prevSetInputValue,
                phone:value
            }))
        }
        if(id === 'message' && validateError){
            setInputValue(prevSetInputValue => ({
                ...prevSetInputValue,
                message:value
            }))
        }
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        const inputs = Object.entries(inputValue).find(([key, value]) => value.length === 0);
        if(!errors || inputs === undefined){
            if(prueba) {
                setPrueba('')
                return
            }
            const templateParams = {
                from_name: `👋 ${inputValue.name} ${inputValue.surname}`,
                from_email: inputValue.email,
                message: `Hola mi consulta es... ${inputValue.message} y mi teléfono es ${inputValue.phone}`
            }

            emailjs.send(
                servisId,
                templateId,
                templateParams,
                userId
            ).then((response) => {
              if(response.status === 200){
                  setAlert('📧 Tu consulta se envió con exito!.. No olvides de revisar tu casilla de span 😉')
              }
            }).catch((error) => {
                  setAlert('Algo salió mal ⚠️')
            })

            setInputValue({
                name: '',
                surname:'',
                email:'',
                phone:'',
                message:''
            })
        }else setAlert('Se requieren todos los campos o son inválidos')
    }

    const handleClose = ()=>{
        setAlert('')
    }

    return(
        <div>
            <h2>Consultas</h2>
            {alert && <div className='alert' >
                        <p>{alert}</p>
                        <svg onClick={handleClose}
                             width="24"  
                             height="24"  
                             viewBox="0 0 24 24"  
                             fill="none"  
                             stroke="currentColor"  
                             stroke-width="2"  
                             stroke-linecap="round" 
                             stroke-linejoin="round"  
                             >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                      </div>}
            <form className='form'>
                <label htmlFor="prueba" style={{display:'none'}} >prueba</label>
                <input type="text" 
                       id='prueba'
                       onChange={()=>setPrueba('bot')}
                       value={prueba}
                       style={{display:'none'}}
                       />
                <label htmlFor="name">Nombre</label>
                <input id='name'
                       value={inputValue.name}
                       onChange={handleInputValue} 
                       type="text" 
                       required
                       />
                {errors && <p>{errors.name}</p>}
                <label htmlFor="surname">Apellido</label>
                <input id='surname'
                       value={inputValue.surname}
                       onChange={handleInputValue} 
                       type="text" 
                       required
                       />
                {errors && <p>{errors.surname}</p>}
                <label htmlFor="email">E-mail</label>       
                <input id='email' 
                       value={inputValue.email}
                       onChange={handleInputValue} 
                       type="email" 
                       required
                       />
                {errors && <p>{errors.email}</p>}
                <label htmlFor="phone">Teléfono</label>
                <input id='phone' 
                       value={inputValue.phone}
                       onChange={handleInputValue} 
                       type='text' 
                       required
                       />
                {errors && <p>{errors.country}</p>}
                <label htmlFor="message">Mensaje</label>
                <textarea id='message'
                          value={inputValue.message}
                          onChange={handleInputValue}>
                </textarea>
                {errors && <p>{errors.message}</p>}
                <div className='box_button' >
                    <button onClick={handleSubmit} >ENVIAR </button>
                </div>
            </form>
        </div>
    )
}   