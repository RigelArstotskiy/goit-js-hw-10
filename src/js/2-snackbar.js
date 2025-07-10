import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  
   const delay = parseInt(form.delay.value);
   const state = form.state.value;

   createPromise(delay, state)
        .then(delay => {
            console.log(`✅ Fulfilled promise in ${delay}ms`);
            showNotification('success', `✅ Fulfilled promise in ${delay}ms`);
        })
        .catch(delay => {
            console.log(`❌ Rejected promise in ${delay}ms`);
            showNotification('error', `❌ Rejected promise in ${delay}ms`);
        });

    form.reset();

    form.state[0].checked = true;
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function showNotification(type, message) {
  const settings = {
    title: type === 'success' ? 'Success' : 'Error',
    message: message,
    position: 'topRight',
    timeout: 5000,
    closeOnClick: true
  };

  if (type === 'success') {
    iziToast.success(settings);
  } else {
    iziToast.error(settings);
  }
}