import type { NextPage } from 'next';



import MainLayout from '../../components/layouts/mainlayout'
import Header from '../../components/header';

const Home: NextPage = () => {
  return (
    <MainLayout title="haha"
        head={<Header title="hello world" />}
    >

      
    <div>hello babe</div>
    <div>hello babe</div>
    <div>hello babe</div>
    <div>hello babe</div>
    <div>hello babe</div>
    <div>hello babe</div>
    
    </MainLayout>
  )
}

export default Home
