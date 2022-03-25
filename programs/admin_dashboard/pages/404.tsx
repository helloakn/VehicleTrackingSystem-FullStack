import MainLayout from '../components/layouts/mainlayout'
import Header from '../components/header';

export default function Custom404() {
    return(
        <MainLayout title="haha"
            head={
                <Header 
                title="Article Not Found"
                
                />
            }
        >
          Page Not Found.
        </MainLayout>
    );
}