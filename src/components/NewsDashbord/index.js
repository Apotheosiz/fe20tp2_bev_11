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
    }, [comp])
    return (<div>
        <h1>News Dashbord</h1> 
        {newsData ? <Article articles={newsData.articles}/> : null }
        </div>)

}
const ArticlesWrapper = styled.div`
width: 95%;
margin: 0 auto;
max-width: 800px;
`
const StyledArticle = styled.article`

margin-bottom: 15px;
div{
    display: flex;
    align-items: center;
}
img{ 
    width: 20%;
    height: 20%;
    margin-right: 10px;
}
` 

const Article = ({articles}) => {
    return (<ArticlesWrapper>
        {articles.map(article =>
        <StyledArticle>
            <div>
                <img src={article.urlToImage} />
                <h1>{article.title}</h1>
             
             </div>
             <p>{article.content}</p>

        </StyledArticle>
        
            )}
        
    </ArticlesWrapper>)
}


export default NewsDashbord;