import MainLayout from '../components/layouts/mainlayout'
import Header from '../components/header';
export default function Custom500() {
    return(
        <MainLayout title="haha"
            head={
                <Header 
                title="Article Not Found"
                
                />
            }
        >
         There is something went wrong. <br/> Please Try Again!
        </MainLayout>
    );
}