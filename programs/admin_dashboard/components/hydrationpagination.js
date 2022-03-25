export default function HydrationPagination({...props }) {
    let paginate = props.paginate;
    
    let styles = props.styles;
    
    let tmpHtml = [];
    
    
    tmpHtml = [];
    let currentPage = paginate.page_at;
    let startPage = 1;
    if(paginate.totalPage<5){
        startPage = 1;
    }
    else{
        if(currentPage>2){
            if(paginate.totalPage-currentPage<2 && paginate.totalPage>5){
                startPage = (paginate.totalPage-4);
            }
            else{
                startPage = currentPage-2;
            }
            
        }
    }
    
    for(let i = startPage; i<startPage+5; i++ ){
        if(i<=paginate.totalPage){
        //tmpHtml += `<a class="page-link `+(paginate.page_at==i?"aActive":"")+`" tag="`+i+`" href="${_root+"?page_at="+i}" >`+i+`</a>`;
        tmpHtml.push(
            <a 
            className={"page-link "+(paginate.page_at==i?"aActive":"")} 
            tag={i}  
            onClick={props.clickEvent}
            >
                {i}
            </a>
        );
        }
    }

    let tmpFirstHtml =[];
    if(parseInt(paginate.page_at)>1){
   // tmpFirstHtml = `<a class="page-link " tag="1" href="${_root+"?page_at=1"}" >First</a>`;
   tmpFirstHtml.push(
            <a className="page-link " tag="1" 
            onClick={props.clickEvent}
            >First</a>
        );
    }

    let tmpLastHtml = [];
    if(paginate.totalPage!=paginate.page_at){
        tmpLastHtml.push(
            <a class="page-link " tag={paginate.totalPage}
            onClick={props.clickEvent}
            >Last</a>
        );
        //tmpLastHtml = `<a class="page-link " tag="`+paginate.totalPage+`" href="${_root+"?page_at="+paginate.totalPage}" >Last </a>`;
    }
    

    //let final = tmpFirstHtml + tmpHtml + tmpLastHtml;
    let finalHtml = tmpFirstHtml.concat(tmpHtml,tmpLastHtml);
    return(
        <>
            <div 
            className={styles.InnerPagination}
            >
                {finalHtml}
            </div>
        </>
    );
    
}