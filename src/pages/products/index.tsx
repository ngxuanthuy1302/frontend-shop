import { Pagination } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../interface/product.interface';
import { ProductAPI } from '../../apis/products.api';
import Loading from '../../components/Loading';
import { ICategory } from '../../interface/category.interface';
import { CaterotyAPI } from '../../apis/categories.api';
import { ICollection } from '../../interface/collection.interface';
import { CollectionAPI } from '../../apis/collection.api';

const Products = ({ children }: { children?: ReactNode | undefined }) => {
  const navigate = useNavigate();
  const [listProducts, setListProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [collection, setCollection] = useState<ICollection[]>([]);
  const limit: number = 6;
  const { type, detail } = useParams();
  const [title, setTitle] = useState<string>('');
  let idType: string;

  useEffect(() => {
    document.title = title + ' - NEM FASHION';
  }, [title]);

  useEffect(() => {
    CaterotyAPI.fetchAll().then((res) => {
      setCategory(res.data);
    });
  }, []);
  useEffect(() => {
    CollectionAPI.fetchAll().then((res) => {
      setCollection(res.data);
    });
  }, []);

  useEffect(() => {
    if (type === 'collections') {
      collection.map((el) => {
        if (el.path?.replace('/', '') === detail) {
          if (el.id && el.name) {
            idType = el.id;
            setTitle(el.name);
          }
        }
      });
      ProductAPI.fetchByCollections(idType).then((res) => setTotalProducts(res.data.length));
    } else if (type === 'categories') {
      category.map((el) => {
        if (el.path?.replace('/', '') === detail) {
          if (el.id && el.name) {
            idType = el.id;
            setTitle(el.name);
          }
        }
      });
      ProductAPI.fetchByCategories(idType).then((res) => setTotalProducts(res.data.length));
    } else {
      ProductAPI.fetchAll().then((res) => {
        setTotalProducts(res.data.length);
        setTitle('Tất cả sản phẩm');
      });
    }
  }, [detail, type]);
  useEffect(() => {
    if (type === 'collections') {
      ProductAPI.fetchCollecbyPaginate(skip, limit, idType).then((res) => {
        setListProducts(res.data);
        setLoading(false);
      });
    } else if (type === 'categories') {
      ProductAPI.fetchCategorybyPaginate(skip, limit, idType).then((res) => {
        setListProducts(res.data);
        setLoading(false);
      });
    } else {
      ProductAPI.fetchAllbyPaginate(skip, limit).then((res) => {
        setListProducts(res.data);
        setLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, type, detail]);
  return (
    <>
      <ul className="flex gap-1 font-[500] border-y-[1px] border-y-gray-300 p-4">
        <li className="gap-1 flex uppercase cursor-pointer hover:text-blue-300">
          TRANG CHỦ
          <span>/</span>
        </li>
        <li className="uppercase">{title}</li>
      </ul>
      <section className="w-full object-cover mb-[5px]">
        <img
          src="//theme.hstatic.net/200000182297/1000887316/14/ms_banner_img1.jpg?v=618"
          alt="Banner "
          className="cursor-pointer"
          onClick={() => navigate('/')}></img>
      </section>
      {loading ? (
        <Loading />
      ) : (
        <div className="lg:flex lg:flex-row-reverse w-full px-6 lg:px-[80px]">
          <section className="mt-10 lg:w-[80%]">
            <div className=" flex flex-col">
              <p className="font-[500] text-[20px] flex justify-start">Các sản phẩm : {title}</p>
              <ul className="mt-[30px] gap-[5px] flex flex-wrap">
                {listProducts.map((el, index) => (
                  <li
                    className="w-[32%] overflow-hidden"
                    key={index}>
                    <div className="w-full relative product h-[207px] lg:h-[470px]">
                      <img
                        className="h-full w-full object-cover cursor-pointer"
                        src={el.image ? el.image[0] : ''}
                        data-src={el.image ? el.image[0] : ''}
                        alt={el.name}></img>
                      <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                        <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                          Tư vấn
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-full flex flex-col justify-center py-2 px-2"
                      onClick={() => {
                        navigate(`/singleproduct/${el.id}`);
                      }}>
                      <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 text-[#8A8A8F]">
                        {el.name}
                      </span>
                      <span className="mt-2 text-black font-bold">{el.price} đ</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {totalProducts > limit && (
              <Pagination
                className="mb-5 mt-10 font-bold"
                defaultCurrent={1}
                total={totalProducts}
                pageSize={limit}
                onChange={(e) => {
                  setSkip((e - 1) * limit);
                  setLoading(true);
                }}
              />
            )}
          </section>
          <section className="mt-10 flex flex-col items-start gap-2 lg:w-[20%]">
            <span className="font-bold">Tất cả sản phẩm</span>
            <ul className="flex flex-col items-start">
              <li className="font-bold">Danh mục</li>
              {category.map((el, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer"
                    onClick={() => navigate(`/products/categories${el.path}`)}>
                    {el.name}
                  </li>
                );
              })}
            </ul>
            <ul className="flex flex-col items-start">
              <li className="font-bold">Bộ sưu tập</li>
              {collection.map((el, index) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer"
                    onClick={() => navigate(`/products/collections/${el.path}`)}>
                    {el.name}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </>
  );
};

export default Products;
