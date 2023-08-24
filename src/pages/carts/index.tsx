import { Button, Input, InputNumber, Popconfirm, Typography } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartAPI } from '../../apis/cart.api';
import { IProduct } from '../../interface/product.interface';
import './index.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DeleteProductCart, GetCart, SetCart, UpdateCart } from '../../app/reducers/Cart/cart.reducer';
import { ICart } from '../../interface/cart.interface';
import { success } from '../../helper/toastifyNoti.helper';

interface IListCart {
  product: IProduct;
  sizeSelect: string;
  count: number;
}
const Cart = ({ children }: { children?: ReactNode | undefined }) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState<number>(0);
  const tokenUser = localStorage.getItem('userToken');
  const listCart = useAppSelector(GetCart);
  const dispatch = useAppDispatch();
  const [cart, setCart] = useState<ICart>();

  useEffect(() => {
    if (tokenUser)
      CartAPI.fetchbyUser(tokenUser).then((res) => {
        dispatch(SetCart(res.data[0].products));
        setCart(res.data[0]);
      });
  }, [tokenUser, dispatch]);

  useEffect(() => {
    document.title = 'Giỏ hàng của bạn - NEM SHOP';
    setTotal(listCart.reduce(totalHandle, 0));
  }, [listCart, dispatch]);

  const totalHandle = (accumulator: number, currentValue: IListCart) => {
    return accumulator + (currentValue.count && currentValue.product.price ? currentValue.count * currentValue.product.price : 0);
  };

  const removeProduct = (product: IListCart) => {
    if (cart && cart.id) {
      const index: number = cart.products?.findIndex((el) => el === product) ? cart.products?.findIndex((el) => el === product) : -1;
      let newList = listCart.slice();
      newList.splice(index, 1);
      CartAPI.update(cart.id, { products: newList }).then(() => {
        success('Đã xóa sản phẩm');
        dispatch(DeleteProductCart(product));
      });
    }
  };
  console.log(listCart);
  return (
    <>
      <ul className="flex gap-1 font-[500] border-y-[1px] border-y-gray-300 p-4">
        <li
          className="gap-1 flex"
          onClick={() => navigate('/')}>
          TRANG CHỦ
          <span>/</span>
        </li>
        <li className="">Giỏ hàng</li>
      </ul>

      <div className=" w-full px-6 lg:px-[80px]">
        <section className="mt-10">
          <div className=" flex flex-col">
            <p className="font-[500] text-[40px] flex justify-center">Giỏ hàng của bạn</p>
            <ul className="mt-[30px] gap-5 flex flex-col ">
              {listCart.map((el, index) => {
                return (
                  <li
                    className="w-full overflow-hidden flex gap-10 border-b-[1px] border-solid border-gray-300 items-center"
                    key={index}>
                    <div className="w-[250px] relative h-[257px]">
                      <img
                        className="h-full w-full object-cover cursor-pointer"
                        src={el.product.image ? el.product.image[0] : ''}
                        data-src={el.product.image ? el.product.image[0] : ''}
                        alt={el.product.name}></img>
                    </div>
                    <div className="w-full flex flex-col justify-start items-start text-[16px] gap-2 lg:flex-row lg:items-center lg:gap-[80px]">
                      <span className="cursor-pointer text-black uppercase flex-wrap font-bold overflow-hidden text-ellipsis whitespace-pre-wrap ">
                        {el.product.name}
                      </span>
                      <span>Size:{el.sizeSelect}</span>
                      <span className="flex items-center">
                        Số lượng:
                        <InputNumber defaultValue={1} />
                      </span>

                      <span className=" text-black font-bold text-[20px]">Đơn giá:{el.product.price} đ</span>
                    </div>

                    <Button
                      className="hover:text-black delete"
                      onClick={() => removeProduct(el)}>
                      Xóa
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>

          <section className="mt-10 py-10 border-t-[1px] border-solid border-gray-300 flex h-[300px] gap-[100px]">
            <div className="flex-1">
              <span>Ghi chú</span>
              <Input.TextArea className="detail-input" />
            </div>
            <div className="w-[300px]">
              <span className="text-[20px]">
                Tổng tiền <span className="text-[30px] ml-10 font-bold">{total} đ</span>
              </span>
              <Button className="uppercase h-[50px] bg-sky-500 mt-10">Thanh Toán</Button>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default Cart;
