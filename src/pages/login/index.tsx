import { Button, Checkbox, Form, Input } from 'antd';
import { ReactNode, useState } from 'react';
import { AccountAPI } from '../../apis/account.api';
import { setToken } from '../../helper/userToken';
import { useNavigate } from 'react-router-dom';
import { success, error } from '../../helper/toastifyNoti.helper';
import GlobalLoading from '../../components/GlobalLoading';
import { IAccount } from '../../interface/account.interface';
import { CartAPI } from '../../apis/cart.api';

const Login = ({ children }: { children?: ReactNode | undefined }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [formSignup] = Form.useForm();
  const [checkSubmit, setCheckSubmit] = useState<boolean>(false);
  const [checkSignup, setCheckSignup] = useState<boolean>(false);

  interface ILogin {
    emailLogin: string;
    passwordLogin: string;
  }

  const onFinish = (record: ILogin) => {
    setLoading(true);

    AccountAPI.login({ email: record.emailLogin, password: record.passwordLogin })
      .then((res) => {
        if (res.data) {
          setToken(res.data, true);
          success('Đăng nhập thành công');
          navigate('/');
        } else {
          error('Tài khoản hoặc mật khẩu không chính xác');
          setLoading(false);
        }
      })

      .catch(() => {
        error('Đăng nhập thất bại !');
        setLoading(false);
      });
  };
  const onFinishFailed = () => {
    error('Error');
  };
  const onFinishSignup = (record: IAccount) => {
    AccountAPI.create(record)
      .then((res) => {
        success('Tạo tài khoản thành công');
        CartAPI.create({ accountsId: res.data.id, products: [] });
      })
      .catch((err) => {
        error('Email hoặc số điện thoại đã tồn tại');
      });
  };

  return (
    <>
      <GlobalLoading loading={loading} />
      <ul className="flex gap-1 m-5 font-[500]">
        <li
          className="gap-1 flex"
          onClick={() => navigate('/')}>
          TRANG CHỦ
          <span>/</span>
        </li>
        <li className="uppercase">Tài khoản</li>
      </ul>
      <section className="flex justify-center p-10 lg:p-[70px] w-full">
        <Form
          className="w-1/2 flex flex-col gap-2 px-5 lg:px-[100px] text-left"
          form={form}
          colon={false}
          autoComplete="off"
          onFinishFailed={onFinishFailed}
          onFinish={onFinish}>
          <h4 className="font-bold text-[30px] ">Đăng nhập</h4>
          <span className="my-5">Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!</span>
          <label className="text-[#8f8f8f]">Email</label>
          <Form.Item
            name="emailLogin"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}>
            <Input
              placeholder="Email"
              className="w-full h-10 outline-none border-[#dadada] border-[1px] border-solid pl-5"
            />
          </Form.Item>
          <label className="text-[#8f8f8f]">Password</label>
          <Form.Item
            name="passwordLogin"
            hasFeedback
            rules={[
              {
                type: 'string',
                min: 8,
                message: 'Password have a lot of 8 char',
              },
              {
                required: true,
                message: 'Please input your password',
              },
            ]}>
            <Input.Password
              placeholder="Password"
              className="w-full h-10 outline-none border-[#dadada] border-[1px] border-solid pl-5"
            />
          </Form.Item>
          <a
            href="./"
            className="text-blue-400 text-right">
            Quên mật khẩu
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="font-bold text-white h-10 w-full bg-black  flex items-center justify-center uppercase mt-10">
            Đăng nhập
          </Button>
        </Form>
        <span className="w-[1px] h-auto bg-[#cac9c9]"></span>
        <Form
          className="w-1/2 flex flex-col gap-2 px-5 lg:px-[100px] text-left"
          form={formSignup}
          colon={false}
          autoComplete="off"
          onFinishFailed={onFinishFailed}
          onFinish={onFinishSignup}>
          <h4 className="font-bold text-[30px]">Đăng ký</h4>
          <span className="my-5">Hãy đăng ký ngay để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!</span>
          <label className="text-[#8f8f8f]">Họ</label>
          <Form.Item
            name="firstName"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}>
            <Input
              placeholder="Họ"
              className="w-full h-10 outline-none border-[#dadada] border-[1px] border-solid pl-5"
            />
          </Form.Item>
          <label className="text-[#8f8f8f]">Tên</label>
          <Form.Item
            name="lastName"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}>
            <Input
              placeholder="Tên"
              className="w-full h-10 outline-none border-[#dadada] border-[1px] border-solid pl-5"
            />
          </Form.Item>
          <label className="text-[#8f8f8f]">Email</label>

          <Form.Item
            name="email"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}>
            <Input
              placeholder="Email"
              className="w-full h-10 outline-none border-[#dadada] border-[1px] border-solid pl-5"
            />
          </Form.Item>
          <label className="text-[#8f8f8f]">Số điện thoại</label>
          <Form.Item
            name="phoneNumber"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your Phone Number!',
              },
            ]}>
            <Input
              placeholder="Số điện thoại"
              required
              className="w-full h-10 outline-none border-[#dadada] border-[1px] border-solid pl-5"
            />
          </Form.Item>
          <label className="text-[#8f8f8f]">Password</label>
          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                type: 'string',
                min: 8,
                message: 'Password have a lot of 8 char',
              },
              {
                required: true,
                message: 'Please input your password',
              },
            ]}>
            <Input.Password
              placeholder="Password"
              className="w-full h-10 outline-none border-[#dadada] border-[1px] border-solid pl-5"
            />
          </Form.Item>
          <Checkbox
            className="mt-5"
            onChange={(e) => setCheckSignup(e.target.checked)}>
            Đăng ký nhận bản tin
          </Checkbox>
          <Checkbox onChange={(e) => setCheckSubmit(e.target.checked)}>Tôi đồng ý với các điều khoản của NEM</Checkbox>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!(checkSignup && checkSubmit)}
            className="font-bold text-white h-10 w-full bg-black  flex items-center justify-center uppercase mt-10">
            Đăng kí
          </Button>
        </Form>
      </section>
    </>
  );
};
export default Login;
