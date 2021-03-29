import { useEffect, useState } from "react";
import styled from "styled-components";

const NewsDashbord = ({comp}) => {
const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        comp ? fetch(`http://newsapi.org/v2/everything?q=${comp.name}&from=2021-03-16&language=en&sortBy=publishedAt&apiKey=86d99eeb79074acfbbd3afee92831742`)
            .then(response => response.json())
            .then(data => { 
                setNewsData(data);               
                console.log(data);
            }) : fetch(`http://newsapi.org/v2/top-headlines?country=us&category=business&language=en&sortBy=publishedAt&apiKey=86d99eeb79074acfbbd3afee92831742`)
                .then(response => response.json())
                .then(data => {
                    setNewsData(data);
                    console.log(data);
                })
    }, [])
    return (<div>
        <h1>News Dashbord</h1> 
        {newsData ? <Article articles={newsData.articles}/> : null }
        </div>)

}
const ArticlesWrapper = styled.div`
width: 95%;
margin: 0 auto;
max-width: 800px;
.sourceDate{
    margin: 25px 0 5px 0;
    font-weight: bold;
    color: #5f6368;
    font-size: 14px;
    span{
        font-weight: 400;    
    }
}

`
const StyledArticle = styled.article`

margin-bottom: 25px;
.articleDiv {
    h1 {
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }
    p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }
}
img { 
    max-width: 100%;
    object-fit: contain;
    margin-right: 10px;
}
@media (min-width: 768px) {
    .articleDiv {
        display: flex;
        align-items: center;
    }
    img {
        max-width: 20%;
    }
  }
` 

const Article = ({articles}) => {

    return (<ArticlesWrapper>
        {articles && articles.map(article => <>
        <div className="sourceDate">
            {article.source.name} • <span>{new Date(article.publishedAt).toLocaleString('en-US', {
                month: 'long', // "June"
                day: '2-digit', // "01"
                year: 'numeric', // "2019"
                hour: '2-digit',
                minute: '2-digit',
            })}</span>
        </div>
        <StyledArticle>
            {console.log(article)}
            <div className="articleDiv">
                {article.urlToImage && <img src={article.urlToImage} />}
                <div>
                    {article.title && <h1>{article.title}</h1>}
                    {article.content ?
                        <p>{article.content.split('… [+')[0]}…</p>
                        : article.description ? 
                            <p>{article.description.split('… [+')[0]}…</p>
                            : null
                    } 
                </div>                
             </div>
             

        </StyledArticle>
        <hr></hr>
            </>)}
        
    </ArticlesWrapper>)
}


export default NewsDashbord;