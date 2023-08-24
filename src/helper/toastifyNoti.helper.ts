import { toast } from 'react-toastify';

export const success = (noti: string) => toast.success(noti);

export const error = (noti: string) => toast.error(noti);
