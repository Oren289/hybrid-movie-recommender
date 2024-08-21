import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export function action() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  toast.success('Signed Out!', {
    position: 'bottom-right',
    autoClose: 1500,
    toastId: 'logout-toast',
  });
  return redirect('/');
}
