import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

/* Övning 1: Grundläggande Bokhanteringsapplikation
Beskrivning: Bygg en webbapplikation där användaren kan lägga till, ta bort och uppdatera böcker i en lista. Använd Fetch API för att hantera  bokinformationen via en mock-server eller localStorage. Använd CRUD-operationer (Create, Read, Update, Delete) för att hantera bokdata.
Mål: Att öva på att använda Fetch API och CRUD-operationer i React för att hantera data i en webbapplikation.
 */

function App() {

  const [books, setBooks] = useState([]);
  const [specificBook, setSpecificBook] = useState(null); // null because im not entirely sure what type of info we get, Object?
  const [hasUpdated, setHasUpdated] = useState(false);
  const [specificBookInput, setSpecificBookInput] = useState("");
  const [filterBooksInput, setFilterBooksInput] = useState("");

  useEffect(() => {
    getAllBooks();   
  }, []); // only run once on build, not every re-render

  useEffect(() => {
    if (books.length > 0) {
      console.log("books state-variable: ", books); // runs every time the books-state is updated/populated
    }

  }, [books]);
/* 
  useEffect(() => {
    if (specificBook ) {
      
      console.log("specificBook object values:", Object.values(specificBook));
      
    }
  }, [specificBook])
   */

  // CRUD
  // Create: Adding new data to the database or data source.
  function addBook(newBookObj) {
    setBooks((prevBooks) => [...prevBooks, newBookObj]); // should we have a check so the newBookObj follows the same structure as the others?

    // directly use the books-state, simple and easy to do but bad if 'books' updates at other places simultaneously?
    //setBooks([...books, newBookObj])
  }

  // Read: Retrieving or reading data from the database or data source.
  // here we read the json-file and push the book-data to our state-variable...
  async function getAllBooks() {
    try {
      const result = await fetch("https://freetestapi.com/api/v1/books", {
        method: "GET", // this is default but just to clarify
      }); 

      const data = await result.json();

      console.log("fetched book-data:", data);
      
      setBooks(data);
    } catch (error) {
      console.error("Failed running fetchBookData()");
    }
  }

  // this endpoint doesnt seem to work entirely, I followed their documentation, it just returns empty arrays as data
  async function getSpecificBook(title) {
    try {
      const apiUrl = "https://freetestapi.com/api/v1/books";
      const searchQuery = title ? "?search=" + encodeURIComponent(title) : "";
      const url = apiUrl + searchQuery;

      console.log(`Requesting data from: ${url}`);

      // Fetch the data
      const result = await fetch(url);
      const data = await result.json();

      console.log(`requested book information for title "${title}": ${data}`);
      console.log("specificBook object values:", Object.values(data)); // Object.values needed in this case? otherwise just [object Object] as data
      setSpecificBook(Object.values(data));
      
    } catch (error) {
      console.error("Failed running getSpecificBook(title)");
    }
  }

  // Update: Modifying existing data in the database or data source.
 
  async function updateBookData(title) {
    try {
      const result = await fetch("", {

      })
    } catch (error) {
      
    }
  } 
  

  
  // Delete: Deleting existing data in the database or data source.


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Books and stuff
        </h1>

        <div style={{display: "flex", flexDirection: "column", width: 300, alignItems: "center"}}>

          <p>Search for a specific book:</p>  
          <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <label style={{fontSize: 16, width: "100%", textAlign: "start"}} htmlFor="searchSpecificBookInput">Search:</label>
            <input style={{fontSize: 16, width: "100%",  boxSizing: "border-box"}} type="text" name="" id="searchSpecificBookInput" onChange={(e) => {
              setSpecificBookInput(e.target.value); 
            }}/>
            <button style={{width: "100%", boxSizing: "border-box"}} onClick={() => {
              getSpecificBook(specificBookInput)
            }}>Search</button>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%",  boxSizing: "border-box", height: 300, borderStyle: "solid", borderColor: "white", borderWidth: 4, overflowY: "auto"}}>
              {specificBook && <ul>{specificBook.map((book, index) => {
                return (
                  <li style={{fontSize: 12}} key={index}>
                    <p>{book.title}</p>
                    <img style={{height: 50}} alt='No image' src={book.cover_image}/> {/*cover_image are fake images */}
                  </li>
                )
              })}</ul>}
              
            </div>
          </div>
        </div>
        

        <p style={{paddingBottom: 0, marginBottom: 0}}>All Books:</p>
        {books.length > 0 ? (<div>
          <ul > {/* default <ul> has marginTop */}
            <div style={{display: "flex", flexDirection: "column", alignItems: "start"}}>
              <label style={{fontSize: 16}} htmlFor="filterBooksInput">Filter:</label>
              <input style={{fontSize: 16}}  type="text" name="" id="filterBooksInput" onChange={(e) => {
                setFilterBooksInput(e.target.value)
              }}/>
            </div>
          {books.map((book, index) => {  {/* index is automatically genereted */}
            if (filterBooksInput === "" || book.title.toLowerCase().startsWith(filterBooksInput.toLowerCase()) )
            return (
              <li style={{fontSize: 12}} key={index}>
                <p>{book.title}</p>
              </li>
            )
          })}
          </ul>
        </div>) : (<div style={{height: 200, width: "100%"}}>Loading books...</div>)}
      </header>
    </div>
  );
}

export default App;
