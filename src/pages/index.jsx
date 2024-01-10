const { useRef, useLayoutEffect } = React;
let wrap = document.getElementById("recom-wrap");
let button = document.getElementById("button");
let old = document.getElementById("new");
let skel = document.getElementById("skel");
const { useState, useEffect } = React;
document.getElementById("connect").style.display = "none";
const API_URL = "http://www.omdbapi.com?apikey=cbeeed92";
const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  return (
    <div
      className="movie"
      key={imdbID}
      onClick={() => {
        details(Poster, imdbID);
      }}
    >
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>

      <div>
        <span id="type">{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
};

function Loading() {
  <div className="empty">
    <span class="sr-only">Loading...</span>
    <div class="spinner-grow text-info" role="status"></div>
  </div>;
}
function Skeleton() {
  <div id="secskel">
    <div class="skeleton text" id="stext"></div>
    <div id="sposter">
      <div class="skeleton poster"></div>
      <div class="skeleton poster"></div>
      <div class="skeleton poster"></div>
      <div class="skeleton poster"></div>
    </div>
  </div>;
}
const App = () => {
  // let prr = [];
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const inputr = useRef(null);
  const [loading, setLoading] = useState(false);
  async function searchMovies(title) {
    if (title !== "") {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }
  // export { searchMovies };
  useLayoutEffect(() => {
    console.log("inputr:", inputr);
    console.log("input element:", inputr.current);
    console.log("useLayoutEffect called");
    // inputr.current.focus();
    inputr.current.select();
  }, []);
  useEffect(() => {
    searchMovies("Batman");
    setSearchTerm("Batman");
  }, []);

  useEffect(() => {
    console.log(searchTerm);
    if (searchTerm.toString().length % 3 == 0) {
      // alert("")
      searchMovies(searchTerm);
    }
  }, [searchTerm]);

  function Notfound() {
    return (
      <div id="notfound">
        <img src="../../public/buddy-13.png" />
        <div>Movie not found</div>
      </div>
    );
  }
  return (
    <div className="app" id="app">
      <h1>
        Neat<span id="color">Flix</span>
      </h1>
      <div className="search" id="src">
        <input
          value={searchTerm}
          autoFocus
          ref={inputr}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" ? searchMovies(searchTerm) : console.log("")
          }
          placeholder={searchTerm == "" ? "enter a search term" : ""}
          id="movieinput"
          autoComplete="off"
        />

        <img
          onClick={() =>
            searchTerm !== "" ? (
              searchMovies(searchTerm)
            ) : (
              <div>
                EMPTY INPUT
                {/* {
                  (document.getElementById("src").style.border =
                    "red 2px solid")
                }
                {setTimeout(() => {
                  document.getElementById("movieinput").focus();
                  return (document.getElementById("src").style.border =
                    "blue 2px solid");
                }, 2000)} */}
              </div>
            )
          }
          id="img"
          src="../../public/icons8-search-50.png"
        ></img>
      </div>
      <div className="container">
        {loading ? (
          <div className="empty">
            <span className="sr-only">Loading...</span>
            <div className="spinner-grow text-info" role="status"></div>
          </div>
        ) : movies === undefined ? (
          <h1 style={{ color: "white" }}>
            <Notfound />{" "}
          </h1>
        ) : movies.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <span className="sr-only">Loading...</span>
            <div className="spinner-grow text-info" role="status"></div>
          </div>
        )}
      </div>
    </div>
  );
};
function Router() {
  return (
    <div id="route">
      <div
        id="hohohome"
        className="rrr"
        onClick={() => {
          window.location.reload();
        }}
      >
        <button id="home">Home</button>
      </div>
    </div>
  );
}
ReactDOM.render(<App />, wrap);
function details(Poster, imdbID) {
  skel.style.display = "grid";
  wrap.style.display = "none";
  window.scrollTo(0, 0);
  // let data;
  const u = `https://moviesminidatabase.p.rapidapi.com/movie/id/${imdbID}/more_like_this/`;
  const opt = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7744153fc1msh642003a89c860b1p1450a5jsnd5d752d0e0c6",
      "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
    },
  };

  const detail = fetch(`${API_URL}&i=${imdbID}`).then((response) =>
    response.json()
  );

  const url = `https://moviesdatabase.p.rapidapi.com/titles/seasons/${imdbID}`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "7744153fc1msh642003a89c860b1p1450a5jsnd5d752d0e0c6",
      "X-RapidAPI-Host": "moviesdatabase.p.fffrapidapi.com",
    },
  };

  const urls = `https://moviesminidatabase.p.rapidapi.com/movie/id/${imdbID}/cast/`;
  const optionss = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7744153fc1msh642003a89c860b1p1450a5jsnd5d752d0e0c6",
      "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
    },
  };

  try {
    document.getElementById("app").style.display = "none";
  } catch (error) {}
  Promise.all([
    fetch(u, opt).then((response) => response.json()),
    fetch(url, options).then((response) => response.json()),
    fetch(urls, optionss).then((response) => response.json()),
    fetch(`${API_URL}&i=${imdbID}`).then((response) => response.json()),
    fetch(
      `https://api.themoviedb.org/3/movie/${imdbID}/similar?api_key=152722fd5de11de416ecaf59fec0bc99`
    ).then((response) => response.json()),
  ])
    .then(([result1, result2, result3, data, result5]) => {
      console.log(result5.results);
      console.log(result1); // Do something with `result1` here
      console.log(result2); // Do something with `result2` here
      console.log(result3.results.roles); // Do something with `result3` here
      detail;
      function Carousel() {
        const [displayitem, setdisplayitem] = useState(0);
        let arr = result5.results;
        console.log(displayitem);
        let item = [];
        try {
          item = [];
          arr.map((el) => {
            let poster = "https://image.tmdb.org/t/p/w500" + el.poster_path;
            if (!poster.toString().includes("null")) {
              item.push(
                <div
                  id="item"
                  onClick={() => {
                    fetch(
                      `https://api.themoviedb.org/3/movie/${el.id}?api_key=152722fd5de11de416ecaf59fec0bc99`
                    )
                      .then((response) => response.json())
                      .then((data) => details(poster, data.imdb_id));
                  }}
                >
                  <div id="like-img">
                    <img src={poster} />
                  </div>
                  <div id="title">
                    <div>
                      {el.title.includes(":")
                        ? (el.title = el.title.slice(0, el.title.indexOf(":")))
                        : el.title}
                    </div>
                  </div>
                </div>
              );
            }
          });

          let temp = [];
          if (arr.length) {
            window.onscroll = function (ev) {
              if (
                window.innerHeight + Math.round(window.scrollY) + 340 >=
                document.body.offsetHeight
              ) {
                document.getElementById("poster").style.display = "none";
                document.getElementById("btn-car").style.transform =
                  "translate(-10%)";
                document.getElementById("tit").style.transform =
                  "translate(-10%)";
                document.getElementById("routte").style.transform =
                  "translate(-15%)";

                // document.getElementById("btn-car").style.width = "100%";
              } else {
                document.getElementById("poster").style.display = "block";
                document.getElementById("btn-car").style.transform =
                  "translate(0%)";
                document.getElementById("tit").style.transform =
                  "translate(0%)";
                document.getElementById("routte").style.transform =
                  "translate(0%)";
              }
            };
            for (let index = displayitem; index <= displayitem + 2; index++) {
              console.log(index);
              if (index == item.length) {
                // index = 0
                // alert("");
                setdisplayitem(0);
              }
              temp.push(item[index]);
            }
            return (
              <div>
                <div id="tit">More like this</div>
                <div id="btn-car">
                  <span
                    class="material-symbols-outlined"
                    onClick={() => {
                      if (displayitem == 0) {
                        // setdisplayitem()
                      } else {
                        setdisplayitem(displayitem - 3);
                      }
                    }}
                  >
                    arrow_back_ios
                  </span>
                  <div id="carousel">
                    {" "}
                    <div id="inner-div">{temp}</div>
                  </div>
                  <span
                    class="material-symbols-outlined"
                    onClick={() => {
                      setdisplayitem(displayitem + 3);
                    }}
                  >
                    arrow_forward_ios
                  </span>
                </div>
              </div>
            );
          } else {
            return <div></div>;
          }
        } catch (error) {
          console.log(error);
        } finally {
          console.log(item);
        }
      }
      function Photo() {
        skel.style.display = "flex";

        return (
          <div id="hey">
            <Title />
            <div id="poster">
              <img src={Poster} alt="" />
              <div id="span">
                <div>Rating : {data.Rated}</div>
                <span>
                  <a
                    target="_blank"
                    href="https://en.wikipedia.org/wiki/TV_Parental_Guidelines"
                    class="link-success"
                  >
                    Confused?
                  </a>
                </span>
              </div>
            </div>
            <Sect />
          </div>
        );
      }
      function Title() {
        return (
          <div id="first-sec">
            <div id="title">
              <h1>
                {`${data.Title}  `}
                {`(${data.Year})`}
              </h1>
            </div>
            <div id="plot-ward" autoFocus>
              <div id="plot">
                <p>{data.Plot}</p>
              </div>
              {data.Awards !== "N/A" ? (
                <div id="awards">{data.Awards}</div>
              ) : (
                <div id="awards">Movie/series has no awards</div>
              )}
            </div>
            <div id="center">
              <div id="info">
                <div>
                  Released:<span>{` ${data.Released}`}</span>
                </div>
                <div>
                  Runtime: <span>{` ${data.Runtime}`}</span>
                </div>
                <div>
                  Genre: <span>{` ${data.Genre}`}</span>
                </div>
                <div>
                  Director: <span> {` ${data.Director}`}</span>
                </div>
                <div>
                  Language: <span>{` ${data.Language}`}</span>
                </div>
              </div>
            </div>
            <div id="scroll-div">
              <svg
                width="30px"
                height="20px"
                id="scroll-me"
                onClick={handleclick}
              >
                <path
                  stroke="#ff6748 "
                  stroke-width="4px"
                  d="M2.000,5.000 L15.000,18.000 L28.000,5.000 "
                ></path>
              </svg>
            </div>
          </div>
        );
      }

      function Sect() {
        let array = data.Ratings;
        function Mov() {
          return (
            <div id="second-sec">
              <div id="r-parent">
                <h1>Ratings</h1>
                {array.length ? (
                  array.map((a) => {
                    return (
                      <div className="r-child">
                        {a.Source}:<span id="a-value">{a.Value}</span>
                      </div>
                    );
                  })
                ) : (
                  <div>No ratings were recorded</div>
                )}

                {data.Actors !== "N/A" ? (
                  <div id="actors">
                    Actors:<span id="act">{data.Actors}</span>
                  </div>
                ) : (
                  console.log("hey")
                )}
              </div>
              <Carousel />
              <div id="routte">
                <div
                  id="hohohome"
                  className="rrr"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  <button id="home">Home</button>
                </div>
              </div>
            </div>
          );
        }
        function Series() {
          let temp = [];
          let res;
          let arr = [];
          function Seasons({ arr }) {
            if (arr.length) {
              return (
                <div>
                  <div
                    id="collection"
                    autoFocus
                    style={{
                      gridTemplateRows: `repeat(${Math.round(
                        arr.length / 5
                      )} , 1fr )`,
                    }}
                  >
                    {arr}
                  </div>
                  <div id="routter">
                    <div
                      id="hohohome"
                      className="rrr"
                      onClick={() => {
                        details(Poster, imdbID);
                      }}
                    >
                      <button id="home">Home</button>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div id="notfounddiv">
                  <img src="../../public/buddy-13.png" />
                  <div>No data found</div>
                  <div id="routter">
                    <div
                      id="hohohome"
                      className="rrr"
                      onClick={() => {
                        details(Poster, imdbID);
                      }}
                    >
                      <button id="home">Home</button>
                    </div>
                  </div>
                </div>
              );
            }
          }
          console.log(arr);
          const Dostuff = ({ count }) => {
            const divs = [];
            console.log(count);
            for (let i = 1; i <= count; i++) {
              divs.push(
                <div
                  key={i}
                  className="seasons"
                  onClick={() => {
                    bla();
                    async function bla() {
                      // old.style.display = "flex"
                      const url = `https://moviesminidatabase.p.rapidapi.com/series/id/${imdbID}/season/${i}/episodes/`;
                      const options = {
                        method: "GET",
                        headers: {
                          "content-type": "application/octet-stream",
                          "X-RapidAPI-Key":
                            "7744153fc1msh642003a89c860b1p1450a5jsnd5d752d0e0c6",
                          "X-RapidAPI-Host":
                            "moviesminidatabase.p.rapidapi.com",
                        },
                      };
                      const response = await fetch(url, options);
                      res = await response.json();
                      temp.push(res);
                      temp = temp[0].results;
                      console.log(temp);
                      temp.map((el) => {
                        arr.push(
                          <div id="epi">
                            <div id="tit-epi">
                              <div id="epi-title">{el.title}</div>
                              <div id="epi-epi">
                                {el.episode_number}/{temp.length}
                              </div>
                            </div>
                            <div id="epi-des">{el.description}</div>
                          </div>
                        );
                      });
                      // skel.style.display = "none";
                      ReactDOM.render(
                        <Seasons arr={arr} />,
                        document.getElementById("bodier")
                      );
                    }
                  }}
                >
                  Season <span id="ccool">0{i}</span>
                </div>
              );
            }
            return <div id="flee"> {divs}</div>;
          };

          return (
            <React.Fragment>
              <div id="r-parent" class="series">
                <h1>Ratings</h1>
                {array.map((a) => {
                  return (
                    <div className="r-child">
                      {a.Source}:<span id="a-value">{a.Value}</span>
                    </div>
                  );
                })}
                {data.Actors !== "N/A" ? (
                  <div id="actors">
                    Actors:<span id="act">{data.Actors}</span>
                  </div>
                ) : (
                  console.log("hey")
                )}
              </div>

              <div id="eh">
                <Dostuff count={result2.results} />
              </div>
              <div></div>
              <Router />
            </React.Fragment>
          );
        }

        return (
          <section id="section">
            {console.log(data)}
            {data.Type == "movie" ? <Mov /> : <Series />}
          </section>
        );
      }
      ReactDOM.render(<Photo />, document.getElementById("bodier"));
    })
    .catch((error) => console.error(error));

  console.log(imdbID);
  Poster !== "N/A" ? Poster : (Poster = "https://via.placeholder.com/400");
}
const handleclick = () => {
  document.getElementById("section").scrollIntoView({ behavior: "smooth" });
};
