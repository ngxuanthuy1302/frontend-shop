import React from 'react';
import { FacebookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons';

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center">
        <section className="w-full flex justify-center  bg-[#EFEFF4]">
          <div className="w-full max-w-[1536px] h-[355px] items-center flex flex-col pt-[50px] px-5">
            <span className="uppercase font-bold text-[32px]">Đăng kí bản tin</span>
            <span className="break-normal text-[16px]">Đăng ký nhận bản tin NEM để được cập nhật những mẫu thiết kế mới nhất</span>
            <form
              className="mt-10 lg:w-1/2 w-full"
              action="./"
              method="post">
              <input
                type="email"
                name="email"
                id=""
                className="w-3/5 h-10 text-[16px] pl-5 outline-none"
                placeholder="Vui lòng nhập email..."
              />
              <input
                type="submit"
                name="dangki"
                value={'Đăng kí'}
                className="uppercase w-1/4 h-10 bg-black text-white outline-none"
              />
            </form>
            <section className="text-[30px] mt-8">
              <FacebookFilled className="mx-1" />
              <InstagramFilled className="mx-1" />
              <YoutubeFilled className="mx-1" />
            </section>
          </div>
        </section>
        <section className=" bg-black w-full flex justify-center">
          <div className="w-full max-w-[1536px] flex p-6 bg-black text-white text-[13px] flex-wrap ">
            <div className="w-1/2 lg:w-1/4 flex flex-col items-start p-4">
              <p className="text-left font-bold text-[15px]">NEM FASHION - THỜI TRANG CÔNG SỞ </p>
              <p className="text-left">Công ty TNHH Dịch vụ và Thương mại An Thành. Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017</p>
              <p className="text-left">Địa chỉ: Phòng 1002, tầng 10, Tòa nhà NEM số 545 đường Nguyễn Văn Cừ, P. Gia Thụy, Q. Long Biên, Hà Nội</p>
              <p className="text-left">Chăm sóc khách hàng: 0243.9388512 Mua hàng online: 0246.2909098</p>
              <p className="text-left">Email: nemcskh@stripe-vn.com</p>
            </div>
            <div className="w-1/2 lg:w-1/4 flex flex-col items-start p-4">
              <p className="text-left">Giới thiệu</p>
              <a
                href="/"
                className="text-left">
                Triết lý kinh doanh tại NEM Fashion
              </a>
              <a
                href="/"
                className="text-left">
                NEM's Blog
              </a>
              <a
                href="/"
                className="text-left">
                Hệ thống showroom
              </a>
              <a
                href="/"
                className="text-left">
                Liên hệ
              </a>
            </div>
            <div className="w-1/2 lg:w-1/4 flex flex-col items-start p-4">
              <a
                href="/"
                className="text-left">
                Chính sách giao nhận - Vận chuyển
              </a>
              <a
                href="/"
                className="text-left">
                Hướng dẫn thanh toán
              </a>
              <a
                href="/"
                className="text-left">
                Tra cứu đơn hàng
              </a>
              <a
                href="/"
                className="text-left">
                Hướng dẫn chọn Size
              </a>
              <a
                href="/"
                className="text-left">
                Quy định đổi hàng
              </a>
              <a
                href="/"
                className="text-left">
                Quy định bảo hành và sửa chữa
              </a>
              <a
                href="/"
                className="text-left">
                Khách hàng thân thiết
              </a>
            </div>
            <div className="w-1/2 lg:w-1/4 flex flex-col items-start p-4 gap-2">
              <p className="text-left">Phương thức thanh toán</p>
              <a
                href="/"
                className="text-left">
                <img
                  src="//theme.hstatic.net/200000182297/1000887316/14/image_method_3.png?v=623"
                  alt="method"></img>
              </a>
              <a
                href="/"
                className="text-left">
                <img
                  src="//theme.hstatic.net/200000182297/1000887316/14/bct.png?v=623"
                  alt="method"
                  className="w-[110px]"></img>
              </a>
            </div>
          </div>
        </section>
        <section className="font-bold leading-[50px]">© 2020 - Bản quyền NEM</section>
      </footer>
    </>
  );
}
