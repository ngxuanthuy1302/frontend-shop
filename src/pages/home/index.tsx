import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IProduct } from '../../interface/product.interface';
import { ProductAPI } from '../../apis/products.api';
import Loading from '../../components/Loading';

const Home = ({ children }: { children?: ReactNode | undefined }) => {
  const navigate = useNavigate();
  const [listNewProduct, setListNewProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  document.title = 'THỜI TRANG CÔNG SỞ - NEM SHOP';
  useEffect(() => {
    ProductAPI.newProduct().then((res) => {
      setListNewProduct(res.data);
      setLoading(false);
    });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Banner */}
        <section className="w-full object-cover mb-[5px]">
          <img
            src="//theme.hstatic.net/200000182297/1000887316/14/ms_banner_img1.jpg?v=618"
            alt="Banner "
            className="cursor-pointer"
            onClick={() => navigate('/')}></img>
        </section>
        {/* Fast Option */}
        <section className="w-full flex gap-[5px] mb-[25px]">
          <div
            className="w-1/2"
            onClick={() => navigate('/vay')}>
            <img
              src="//theme.hstatic.net/200000182297/1000887316/14/home_new_banner_1.jpg?v=618"
              alt="DRESS"></img>
            <div className=" cursor-pointer bg-[#efeff4] w-full h-[57px] flex justify-between items-center px-[15px]">
              <span className="text-[18px] leading-[27px] font-[500]">DRESS</span>
              <span className="">SHOP NOW</span>
            </div>
          </div>
          <div
            className="w-1/2"
            onClick={() => navigate('/do-bo')}>
            <img
              src="//theme.hstatic.net/200000182297/1000887316/14/home_new_banner_2.jpg?v=618"
              alt="SET"></img>
            <div className="cursor-pointer bg-[#efeff4] w-full h-[57px] flex justify-between items-center px-[15px]">
              <span className="text-[18px] leading-[27px] font-[500]">SET</span>
              <span className="">SHOP NOW</span>
            </div>
          </div>
        </section>
        {/* New Products */}
        <section>
          {loading ? (
            <Loading />
          ) : (
            <div className="my-[30px]">
              <span className="uppercase text-[32px] font-bold mb-5">Sản phẩm mới</span>
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                infinite={true}
                partialVisible={false}
                className="lg:h-[700px] w-screen max-w-[1536px] h-[500px] md:h-[600px]">
                {listNewProduct.map((el, index) => {
                  return (
                    <div
                      className="w-[96%] overflow-hidden  h-full"
                      key={index}>
                      <div className="relative product">
                        <img
                          className="w-full object-cover cursor-pointer"
                          src={el.image ? el.image[0] : ''}
                          data-src={el.image ? el.image[0] : ''}
                          alt="ĐẦM HOA NHÍ VAI NHÚN D20382"></img>
                        <div
                          className="modal hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50"
                          onClick={() => navigate(`/singleproduct/${el.id}`)}>
                          <p className="text-white px-[50px] leading-8 text-[16px] uppercase font-[700] border-[1px]  border-white hover:text-black hover:bg-white">
                            Tư vấn
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex flex-col justify-center py-2 px-2">
                        <span className="cursor-pointer hover:text-black uppercase flex-wrap font-bold h-[40px] leading-6 break-normal text-[#8A8A8F]">
                          {el.name}
                        </span>
                        <span className="mt-2 text-black font-bold pb-10">{el.price} đ</span>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          )}
        </section>

        <section className="w-full">
          <img
            className="w-full object-cover"
            src="//theme.hstatic.net/200000182297/1000887316/14/hb_image1.jpg?v=623"
            alt="bannerfull"></img>
        </section>
        <section className="my-10 w-full flex flex-col items-center">
          <div className="w-full mb-5">
            <h1 className="uppercase text-[32px] font-bold">nem's blog</h1>
            <span className="uppercase font-bold">ĐÓN ĐẦU XU HƯỚNG, ĐỊNH HÌNH PHONG CÁCH</span>
          </div>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            className="lg:h-[400px] w-full max-w-[1536px] h-[200px] md:h-[300px]"
            dotListClass="custom-dot-list-style">
            <div className="mx-2">
              <img
                className="w-full object-cover mb-5 h-[137px] lg:h-[260px] md:h-[200px]"
                src="//file.hstatic.net/200000182297/article/327890757_8735259056545354_6482098786089923519_n_ee711d5e3b9f4541b8c10fed967c16ca_large.jpg"
                alt="3 CÁCH DIỆN SƠ MI ĐẸP ĐÚNG CHUẨN"></img>
              <span className="font-bold break-normal">3 CÁCH DIỆN SƠ MI ĐẸP ĐÚNG CHUẨN</span>
            </div>
            <div className="mx-2">
              <img
                className="w-full object-cover mb-5 h-[137px] lg:h-[260px] md:h-[200px]"
                src="//file.hstatic.net/200000182297/article/342544079_185591394364106_3474506149512152400_n__1__7b5ebc8e82e84130a3effdf0c7599fa1_large.jpg"
                alt="MINIMAL CHIC"></img>
              <span className="font-bold break-normal">MINIMAL CHIC</span>
            </div>
            <div className="mx-2">
              <img
                className="w-full object-cover mb-5 h-[137px] lg:h-[260px] md:h-[200px]"
                src="//file.hstatic.net/200000182297/article/327890757_8735259056545354_6482098786089923519_n_ee711d5e3b9f4541b8c10fed967c16ca_large.jpg"
                alt="3 CÁCH DIỆN SƠ MI ĐẸP ĐÚNG CHUẨN"></img>
              <span className="font-bold break-normal">3 CÁCH DIỆN SƠ MI ĐẸP ĐÚNG CHUẨN</span>
            </div>
            <div className="mx-2">
              <img
                className="w-full object-cover mb-5 h-[137px] lg:h-[260px] md:h-[200px]"
                src="//file.hstatic.net/200000182297/article/342544079_185591394364106_3474506149512152400_n__1__7b5ebc8e82e84130a3effdf0c7599fa1_large.jpg"
                alt="MINIMAL CHIC"></img>
              <span className="font-bold break-normal">MINIMAL CHIC</span>
            </div>
            <div className="mx-2">
              <img
                className="w-full object-cover mb-5 h-[137px] lg:h-[260px] md:h-[200px]"
                src="//file.hstatic.net/200000182297/article/327890757_8735259056545354_6482098786089923519_n_ee711d5e3b9f4541b8c10fed967c16ca_large.jpg"
                alt="3 CÁCH DIỆN SƠ MI ĐẸP ĐÚNG CHUẨN"></img>
              <span className="font-bold break-normal">3 CÁCH DIỆN SƠ MI ĐẸP ĐÚNG CHUẨN</span>
            </div>
            <div className="mx-2">
              <img
                className="w-full object-cover mb-5 h-[137px] lg:h-[260px] md:h-[200px]"
                src="//file.hstatic.net/200000182297/article/342544079_185591394364106_3474506149512152400_n__1__7b5ebc8e82e84130a3effdf0c7599fa1_large.jpg"
                alt="MINIMAL CHIC"></img>
              <span className="font-bold break-normal">MINIMAL CHIC</span>
            </div>
          </Carousel>
        </section>
      </div>
    </>
  );
};

export default Home;
