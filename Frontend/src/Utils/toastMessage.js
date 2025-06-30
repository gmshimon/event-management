import { toast } from "react-toastify"

export const showToastMessage = (message, type = 'default') => {
  const toastTypes = ['success', 'error', 'info', 'warn', 'default']

  if (!toastTypes.includes(type)) {
    console.warn(`Invalid toast type "${type}" used. Falling back to "default".`)
    type = 'default'
  }

  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: false,
    theme: "colored"
  })
}
