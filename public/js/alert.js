export const hideAlert = () => {
  const el = document.querySelector('.alert')
  if (el) el.parentElement.removeChild(el)
}

export const showAlert = (type, msg) => {
  hideAlert()
  const me = document.querySelector('body')
  // console.log(me)
  const markup = `<div class="alert alert--${type}">${msg}</div>`
  me.insertAdjacentHTML('afterbegin', markup)
  window.setTimeout(hideAlert, 5000)
}
