import { useEffect, useState } from "react";

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

const Article = ({articles}) => {
    return (<div>
        {articles.map(article =>
        <div>
            <h1>{article.title}</h1> 
                <img src={article.urlToImage}  width="50" height="60" />
            <p>{article.content}</p>
        </div>
            )}
        
        </div>)
}


export default NewsDashbord;