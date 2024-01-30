const formEl = document.querySelector("form");
const submitBtn = document.querySelector("input[name='submitBtn']");
const email = document.querySelector("input[name='email']")
const password = document.querySelector("input[name='password']")
const retype = document.querySelector("input[name='retypepassword']")
const fullname = document.querySelector("input[name='name']")
const merchant = document.querySelector("input[name='merchant']")


const PasswordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
const EmailRegex = /[^\s]*@[a-z0-9.-]*/i
let canSubmit = false

const submitForm = data =>{
  console.log(data)
  // formEl.submit()
}

const validateFld = (el, condition)=>{
  if(condition){
    canSubmit= true
    el.parentElement.classList.remove('error')
  }else{
    canSubmit = false
    el.parentElement.classList.add('error')
  }
}

// Validators
email.addEventListener('keyup',function(evt){
  evt.preventDefault()
  validateFld(this,evt.target.reportValidity())
})

password.addEventListener('keyup',function(evt){
  evt.preventDefault()
  validateFld(this,PasswordRegex.test(evt.target.value))
})

retype.addEventListener('keyup',function(evt){
  evt.preventDefault()
  validateFld(this, password.value === evt.target.value)
})

fullname.addEventListener('keyup',function(evt){
  evt.preventDefault()
  evt.target.value = evt.target.value.trimLeft()
  validateFld(this, evt.target.reportValidity())
})


formEl.addEventListener('submit',function(evt){
evt.preventDefault()
const getFormValues = [...evt.target.elements].filter(el => el.type !== 'submit' && el).map(el => {return{
  name: el.getAttribute('name'),
  type: el.type,
  value: el.type === 'checkbox' ? el.checked : el.value
}})

const isFilled = getFormValues.filter(el => el.type !== 'checkbox').every(el=> el.value !== '')

isFilled && canSubmit && submitForm(getFormValues)
})