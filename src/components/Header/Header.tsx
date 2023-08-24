import { BarsOutlined, DownOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Menu, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SetDisplay } from '../../app/reducers/Display/display.reducer';
import { AccountAPI } from '../../apis/account.api';
import { GetAuth, SetAuth } from '../../app/reducers/Auth/auth.reducer';
import { deleteToken } from '../../helper/userToken';
import { success } from '../../helper/toastifyNoti.helper';
import { CaterotyAPI } from '../../apis/categories.api';
import { ICategory } from '../../interface/category.interface';
import { ICollection } from '../../interface/collection.interface';
import { CollectionAPI } from '../../apis/collection.api';
import './index.css';

export default function Header() {
  const auth = useAppSelector(GetAuth);
  const location = useLocation();
  const tokenUser = localStorage.getItem('userToken');
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState<string>('/');
  const [data, setData] = useState<string>('');
  const [category, setCategoty] = useState<ICategory[]>([]);
  const [collection, setCollection] = useState<ICollection[]>([]);

  const submitForm = () => {
    navigate(`/search?value=${data.replace(' ', '+')}`);
    form.resetFields();
  };

  useEffect(() => {
    CaterotyAPI.fetchAll().then((res) => setCategoty(res.data));
  }, []);

  useEffect(() => {
    CollectionAPI.fetchAll().then((res) => setCollection(res.data));
  }, []);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (tokenUser)
      AccountAPI.getUser(tokenUser).then((res) => {
        dispatch(SetAuth(res.data));
      });
  }, [tokenUser, dispatch]);

  const Logout = () => {
    deleteToken();
    dispatch(SetAuth({}));
    success('Đăng xuất thành công!');
    navigate('/');
  };
  return (
    <>
      <header className="h-[92px] w-full bg-white flex items-center justify-center fixed z-50 shadow-md xl:px-[70px]">
        <div className="w-full max-w-[1536px]">
          <div className="px-[30px] w-full flex justify-between items-center">
            <img
              src="//theme.hstatic.net/200000182297/1000887316/14/logo.png?v=618"
              alt="THỜI TRANG CÔNG SỞ"
              className="h-[26px] w-[109px] object-cover cursor-pointer"
              onClick={() => {
                navigate('/');
              }}></img>
            <Menu
              defaultSelectedKeys={[pathName]}
              selectedKeys={[pathName]}
              mode="horizontal"
              className="hidden xl:flex gap-4 text-[10px] uppercase text-[rgba(7,7,7,0.5)] font-bold hover:bg-none header-menu flex-1 justify-around"
              onClick={(info) => navigate(info.key)}>
              <Menu.SubMenu
                onTitleClick={(info) => navigate(info.key)}
                key="/products/all-products"
                title={'Sản phẩm'}
                className="header-item"
                icon={<DownOutlined />}>
                {category.map((el) => {
                  return (
                    <Menu.Item
                      key={`/products/categories${el.path}`}
                      className="header-item-sub">
                      {el.name}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
              <Menu.Item
                key="/products/new-products"
                className="header-item">
                Sản phẩm mới
              </Menu.Item>
              <Menu.SubMenu
                onTitleClick={(info) => navigate(info.key)}
                key="/products/collections"
                className="header-item"
                title={'Bộ sưu tập'}
                icon={<DownOutlined />}>
                {collection.map((el) => {
                  return (
                    <Menu.Item
                      key={`/products/collections/${el.path}`}
                      className="header-item-sub">
                      {el.name}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
              <Menu.Item
                key="/products/nem-online"
                className="header-item">
                Nem Online
              </Menu.Item>
            </Menu>

            <div className="flex gap-[3px] text-[30px] items-center xl:text-[24px]">
              <span className="cursor-pointer xl:px-4 py-4 flex items-center relative search">
                <SearchOutlined />
                <Form
                  form={form}
                  className=" absolute top-[60px] right-[-20px] xl:left-0 w-[250px] hidden search_form"
                  onFinish={submitForm}>
                  <Row className="flex h-10">
                    <Form.Item name="search-input">
                      <Input
                        placeholder="Tìm kiếm"
                        className="h-10 w-[200px]"
                        onChange={(e) => setData(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item className="rounded-[0_6px_6px_0] bg-black h-full w-[50px] flex items-center justify-center">
                      <Button
                        className="text-white text-[20px] border-none flex items-center justify-center "
                        htmlType="submit">
                        <SearchOutlined />
                      </Button>
                    </Form.Item>
                  </Row>
                </Form>
              </span>
              <span className="line hidden xl:block"></span>
              <span className="xl:flex items-center cursor-pointer hidden relative account xl:px-4 py-4">
                <UserOutlined />
                {!tokenUser ? (
                  <>
                    <span
                      className="text-[15px] ml-2 "
                      onClick={() => navigate('/login')}>
                      Tài khoản
                    </span>
                    <ul className="text-[16px] hidden flex-col bg-white items-start absolute w-[200px] top-[60px] shadow-[0px_0px_16px_rgba(17,17,26,0.1)] left-[-5px]">
                      <li
                        className="py-3 px-5 w-full hover:bg-zinc-100 text-start"
                        onClick={() => navigate('/login')}>
                        Đăng nhập
                      </li>
                      <li
                        className="py-3 px-5 w-full hover:bg-zinc-100 text-start"
                        onClick={() => navigate('/login')}>
                        Đăng kí
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <span className="text-[15px] ml-2 ">
                      {auth?.firstName} {auth?.lastName}
                    </span>
                    <ul className="text-[16px] hidden flex-col bg-white items-start absolute w-[200px] top-[60px] shadow-[0px_0px_16px_rgba(17,17,26,0.1)] left-[-5px]">
                      <li
                        className="py-3 px-5 w-full hover:bg-zinc-100 text-start"
                        onClick={() => Logout()}>
                        Đăng xuất
                      </li>
                    </ul>
                  </>
                )}
              </span>

              <span className="line hidden xl:block"></span>
              <span
                className="items-center cursor-pointer xl:px-4 py-4 xl:flex"
                onClick={() => navigate('/cart')}>
                <ShoppingCartOutlined className="cursor-pointer" />
                <span className="text-[15px] ml-2 hidden xl:flex">Giỏ hàng</span>
              </span>
              <BarsOutlined
                className="cursor-pointer xl:hidden xl:px-4 py-4"
                onClick={() => dispatch(SetDisplay('block'))}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
