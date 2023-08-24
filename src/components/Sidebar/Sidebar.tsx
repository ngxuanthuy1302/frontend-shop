import { CloseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaterotyAPI } from '../../apis/categories.api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { GetDisplay, SetDisplay } from '../../app/reducers/Display/display.reducer';
import { ICategory } from '../../interface/category.interface';
import { ICollection } from '../../interface/collection.interface';
import { CollectionAPI } from '../../apis/collection.api';
import './index.css';
import { deleteToken } from '../../helper/userToken';
import { success } from '../../helper/toastifyNoti.helper';
import { SetAuth } from '../../app/reducers/Auth/auth.reducer';

export default function Sidebar() {
  const display = useAppSelector(GetDisplay);
  const tokenUser = localStorage.getItem('userToken');
  const dispatch = useAppDispatch();
  const [pathName, setPathName] = useState<string>('/');
  const navigate = useNavigate();
  const [category, setCategoty] = useState<ICategory[]>([]);
  const [collection, setCollection] = useState<ICollection[]>([]);

  useEffect(() => {
    CaterotyAPI.fetchAll().then((res) => setCategoty(res.data));
  }, []);
  useEffect(() => {
    CollectionAPI.fetchAll().then((res) => setCollection(res.data));
  }, []);
  const Logout = () => {
    deleteToken();
    dispatch(SetAuth({}));
    success('Đăng xuất thành công!');
    navigate('/');
  };
  return (
    <>
      <nav
        style={{ display: `${display}` }}
        className="sidebar-open py-5 fixed w-[35vw] z-[99] right-0 h-screen bg-[rgba(0,0,0,0.8)] overflow-scroll text-white lg:hidden">
        <CloseOutlined
          onClick={() => dispatch(SetDisplay('none'))}
          className="text-white text-[30px] flex justify-end px-5 w-full"
        />
        <Menu
          defaultSelectedKeys={[pathName]}
          selectedKeys={[pathName]}
          mode="inline"
          className="gap-4 text-[15px] uppercase text-white font-bold bg-transparent mt-5 sidebar"
          onClick={(info) => navigate(info.key)}>
          <Menu.SubMenu
            className="text-left"
            onTitleClick={(info) => navigate(info.key)}
            key="/products/all-products"
            title={'Sản phẩm'}>
            {category.map((el) => {
              return <Menu.Item key={`/products/categories${el.path}`}>{el.name}</Menu.Item>;
            })}
          </Menu.SubMenu>
          <Menu.Item
            className="text-left"
            key="/products/new-products">
            Sản phẩm mới
          </Menu.Item>
          <Menu.SubMenu
            className="text-left"
            onTitleClick={(info) => navigate(info.key)}
            key="/products/collections"
            title={'Bộ sưu tập'}>
            {collection.map((el) => {
              return <Menu.Item key={`/products/collections${el.path}`}>{el.name}</Menu.Item>;
            })}
          </Menu.SubMenu>
          <Menu.Item
            className="text-left"
            key="/products/nem-online">
            Nem Online
          </Menu.Item>
          {!tokenUser ? (
            <>
              <Menu.Item
                className="text-left"
                key="/cart">
                Giỏ hàng
              </Menu.Item>
              <Menu.Item
                className="text-left"
                key="/login">
                Đăng nhập
              </Menu.Item>
              <Menu.Item
                className="text-left"
                key="/login/">
                Đăng kí
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.SubMenu
                className="text-left "
                title={'Auth'}
                key={'//'}>
                <Menu.Item
                  className="text-left "
                  key={'/'}
                  onClick={() => Logout()}>
                  Đăng xuất
                </Menu.Item>
              </Menu.SubMenu>
            </>
          )}
        </Menu>
      </nav>
    </>
  );
}
