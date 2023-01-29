import styles from "../styles/Home.module.css";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToBookmark } from "../reducers/bookmark";

import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
function Home() {
  let styleSpan = {};
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [articlesData, setArticlesData] = useState([]);
  const dispatch = useDispatch();
  const [dataExist, setDataExist] = useState(false);
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?sources=the-verge&apiKey=${process.env.KEY_API}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setDataExist(true);
          setArticlesData(data.articles);
        }
      });
  }, []);

  if (dataExist) {
    const articles = articlesData.map((data, i) => {
      const addToBk = () => {
        dispatch(addToBookmark(data));
      };
      return (
        <div>
          <span
            onClick={() => {
              addToBk();
            }}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              className={styles.save}
            ></FontAwesomeIcon>
          </span>
          <img src={data.urlToImage} alt={data.title}></img>
          <div>
            <marquee direction="left">
              <h2>Title : {data.title}</h2>
            </marquee>
            <p>Author : {data.author}</p>
            <p>Description : {data.description} </p>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header />
        <main className={styles.main}>
          <h1>Soyez à jour de ce qui se passe</h1>
          <div className={styles.Container}>{articles}</div>
        </main>
      </div>
    );
  } else {
  }
}

export default Home;
