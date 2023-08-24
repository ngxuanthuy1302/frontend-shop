import { Pagination } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductAPI } from '../../apis/products.api';
import { IProduct } from '../../interface/product.interface';

const Search = ({ children }: { children?: ReactNode | undefined }) => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const data = queryParams.get('value');
  const [listSearch, setListSearch] = useState<IProduct[]>([]);

  document.title = `Kết quả tìm kiếm "${data}" -NEM FASHION`;

  useEffect(() => {
    ProductAPI.findbyName(data ? data : '').then((res) => setListSearch(res.data));
  }, [data]);

  return (
    <>
      <ul className="flex gap-1 font-[500] border-y-[1px] border-y-gray-300 p-4">
        <li
          className="gap-1 flex hover:cursor-pointer hover:text-blue-300"
          onClick={() => navigate('/')}>
          TRANG CHỦ
        </li>
        <span>/</span>
        <li className="uppercase">Tìm kiếm</li>
      </ul>

      <div className="lg:flex w-full px-6 lg:px-[80px]">
        <section className="mt-10 w-full">
          <div className=" flex flex-col w-full">
            <p className="font-[500] text-[40px] flex justify-center">Kết quả tìm kiếm cho "{data}"</p>
            <ul className="mt-[30px] gap-[5px] flex flex-wrap">
              {listSearch.map((el, index) => {
                return (
                  <li
                    className="lg:w-[24%] overflow-hidden w-[49%] md:w-[32%]"
                    key={index}>
                    <div className="w-full relative product h-[350px] lg:h-[470px] md:h-[400px]">
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
                      onClick={() => navigate(`/singleproduct/${el.id}`)}>
                      <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 text-[#8A8A8F]">
                        {el.name}
                      </span>
                      <span className="mt-2 text-black font-bold">{el.price} đ</span>
                    </div>
                  </li>
                );
              })}
              {/* <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover cursor-pointer"
                    src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/12_6546d312a16d476fabf83d258fe46203_1024x1024.jpg"
                    alt="ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG TRẮNG IN HỌA TIẾT TS60102
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li>
              <li className="w-[24%] overflow-hidden">
                <div className="w-full relative product h-[207px] lg:h-[470px]">
                  <img
                    className="h-full w-full object-cover new-product"
                    src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    data-src="//product.hstatic.net/200000182297/product/2_83688f7548bd44789f5f25caa347226e_1024x1024.jpg"
                    alt="ÁO PHÔNG IN HOA TS60112"></img>
                  <div className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50">
                    <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                      Tư vấn
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center py-2 px-2">
                  <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[50px] overflow-hidden text-ellipsis whitespace-pre-wrap leading-6 break-normal text-[#8A8A8F]">
                    ÁO PHÔNG IN HOA TS60112
                  </span>
                  <span className="mt-2 text-black font-bold">359.000 đ</span>
                </div>
              </li> */}
            </ul>
          </div>
          <Pagination
            className="mb-5 mt-10 font-bold"
            defaultCurrent={1}
            total={20}
            pageSize={12}
          />
        </section>
      </div>
    </>
  );
};

export default Search;
