export default function validate (inputs){
    const errors = {}
    const regex = /^[a-zA-Z ]{1,50}$/
    
    const validateName = regex.test(inputs.name)
    if(inputs.name && !validateName){
        errors['name'] = "Caracteres invalidos o demasiado largo"
    }else{
        errors['name'] = ""
    }

    const validateSurname = regex.test(inputs.surname)
    if(inputs.surname && !validateSurname){
        errors['surname'] = "Caracteres invalidos o demasiado largo"
    }else{
        errors['surname'] = ""
    }

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const validateEmail = regexEmail.test(inputs.email)
    if(inputs.email && !validateEmail){
        errors['email'] = "E-mail invalido"
    }else{
        errors['email'] = ""
    }

    const validateCountry = regex.test(inputs.country)
    if(inputs.country && !validateCountry ){
        errors['country'] = "Caracteres invalidos"
    }else{
        errors['country'] = ""
    }

    const regexMessage = /^.{0,200}$/
    const validateMessage = regexMessage.test(inputs.message)
    if(inputs.message && !validateMessage ){
        errors['message'] = "Mensaje demasiado largo"
    }else{
        errors['message'] = ""
    }

    return errors;
}