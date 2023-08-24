import { Button, InputNumber, Select } from 'antd';
import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../interface/product.interface';
import { ProductAPI } from '../../apis/products.api';
import { error, success } from '../../helper/toastifyNoti.helper';
import { CartAPI } from '../../apis/cart.api';
import { ICart } from '../../interface/cart.interface';

const Cart = ({ children }: { children?: ReactNode | undefined }) => {
  const { Option } = Select;
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct>({});
  const [imgSelect, setImgSelect] = useState<string>('');
  const [sizeSelect, setSizeSelect] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [cart, setCart] = useState<ICart>({});
  const tokenUser = localStorage.getItem('userToken');

  document.title = (product.name ? product.name : 'NEMSHOP') + ' - NEM FASHION';

  useEffect(() => {
    if (tokenUser) CartAPI.fetchbyUser(tokenUser).then((res) => setCart(res.data[0]));
  }, [tokenUser]);

  useEffect(() => {
    if (id)
      ProductAPI.single(id)
        .then((res) => {
          setProduct(res.data[0]);
        })
        .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setImgSelect(product.image ? product.image[0] : '');
  }, [product]);

  const submitCart = () => {
    if (sizeSelect === '') {
      error('Vui lòng chọn size!');
    } else {
      if (cart && cart.id) {
        const list = cart.products?.concat({ product, sizeSelect, count });
        CartAPI.update(cart.id, { products: list }).then(() => success('Thêm vào giỏ hàng thành công'));
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <>
      <ul className="flex gap-1 font-[500] border-y-[1px] border-y-gray-300 p-4">
        <li
          className="gap-1 flex hover:cursor-pointer hover:text-blue-300"
          onClick={() => navigate('/')}>
          TRANG CHỦ
          <span>/</span>
        </li>
        <li className="uppercase">{product.name}</li>
      </ul>

      <div className=" w-full px-6 lg:px-[80px] mb-10 ">
        <section className="mt-10">
          <div className=" flex flex-col lg:flex-row">
            <div className="flex lg:w-[70%]">
              <div className="flex flex-col gap-10 lg:w-[20%]">
                {product.image?.map((el, index) => {
                  return (
                    <img
                      key={index}
                      className="h-full w-full object-cover cursor-pointer max-h-[30%]"
                      src={el ? el : ''}
                      onClick={() => {
                        setImgSelect(el);
                      }}
                      data-src={el ? el : ''}
                      alt={product.name}></img>
                  );
                })}
              </div>
              <img
                className=" hidden h-[90%] w-[80%] object-cover cursor-pointer pl-5 lg:block"
                src={imgSelect}
                alt={product.name}></img>
            </div>
            <div className="flex flex-col items-start gap-5 mt-10 font-bold lg:flex-1 lg:pl-10 lg:mt-0 lg:gap-7">
              <span className="text-[20px] lg:text-start uppercase">{product.name}</span>
              <span className="text-[24px]">{product.price} đ</span>
              <span className="flex gap-5 items-center font-bold text-[15px]">
                Size
                <Select
                  onChange={(e) => setSizeSelect(e)}
                  style={{ width: 120 }}
                  defaultValue={''}>
                  <Option
                    key={null}
                    value={''}>
                    {'-Chọn Size-'}
                  </Option>
                  {product.size &&
                    product.size.map((size: string, index: number) => {
                      return (
                        <Option
                          key={index}
                          value={size}>
                          {size}
                        </Option>
                      );
                    })}
                </Select>
              </span>
              <span className="gap-5 flex ">
                Số lượng:
                <InputNumber
                  defaultValue={1}
                  onChange={(e) => setCount(Number(e))}
                />
              </span>
              <span className="gap-5 flex ">{product.descaption}</span>
              <Button
                className="bg-black text-white h-10 w-full uppercase font-bold"
                htmlType="submit"
                onClick={() => submitCart()}>
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
