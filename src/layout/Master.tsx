/** @format */

import { Layout } from 'antd';
import { ReactNode } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import '../index.css';
import Sidebar from '../components/Sidebar/Sidebar';

const { Content } = Layout;

const MasterLayout = ({ children }: { children?: ReactNode | undefined }) => {
  return (
    <Layout
      style={{ minHeight: '100vh' }}
      className="">
      <Layout className="site-layout ">
        <Header />
        <Content className="mt-[92px] bg-white flex justify-center">
          <div className="w-full max-w-[1536px]">{children}</div>
        </Content>
        <Footer />
      </Layout>
      <Sidebar />
    </Layout>
  );
};

export default MasterLayout;
