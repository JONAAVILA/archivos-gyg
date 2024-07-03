import emailjs from 'emailjs-com';
import { useState } from 'react'
import validate from './validate'


export default function Form({servisId,templateId,userId}){

    const [ prueba, setPrueba ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ alert, setAlert ] = useState('')
    const [ inputValue, setInputValue ] = useState({
        name: '',
        surname:'',
        email:'',
        country:'',
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
        if(id === 'country' && validateError){
            setInputValue(prevSetInputValue => ({
                ...prevSetInputValue,
                country:value
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
                message: `Soy de ${inputValue.country} y mi consulta es... ${inputValue.message}`
            }

            emailjs.send(
                servisId,
                templateId,
                templateParams,
                userId
            ).then((response) => {
              console.log('SUCCESS!', response.status, response.text)
              setAlert('📧 Tu consulta se envió con exito ❤️ No olvides de revisar tu casilla de span 😉')
            }).catch((error) => {
              console.error('FAILED...', error)
            })

            setInputValue({
                name: '',
                surname:'',
                email:'',
                country:'',
                message:''
            })
        }else setAlert('Se requieren todos los campos o son inválidos')
    }

    const handleClose = ()=>{
        setAlert('')
    }

    return(
        <div className='container_form '>
            {alert && <div className='alert' >
                        <p>{alert}</p>
                      </div>}
            <form className='form'>
                <h2>Consultas</h2>
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
                <label htmlFor="country">País</label>
                <input id='country' 
                       value={inputValue.country}
                       onChange={handleInputValue} 
                       type="text" 
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
                    <button onClick={handleSubmit} >Enviar </button>
                </div>
            </form>
        </div>
    )
}   