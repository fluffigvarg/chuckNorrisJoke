const http = require("http");

// Get list of Categories
function getCategories(){
  return new Promise((resolve, reject) => {
    const categoryURL = "http://api.icndb.com/categories";
    http.get(categoryURL, (res) => {
      res.on("data", (data) => {
        const category = JSON.parse(data);
        resolve(category);
      });
    });
  });
}

// Pick random category
function pickRandomCategory(categories){
  return new Promise((resolve, reject) => {
    numberOfCategories = categories.value.length;
    resolve(categories.value[Math.floor(Math.random() * numberOfCategories)]);
  });
}

// Get the joke
function getJoke(category){
  return new Promise((resolve, reject) => {
    const jokeURL = "http://api.icndb.com/jokes/random?limitTo=[" + category + "]";
    http.get(jokeURL, (res) => {
      res.on("data", (data) => {
        const joke = JSON.parse(data);
        resolve(joke.value.joke);
      });
    });
  });
}

async function chuckJoke(){
  try {
    const availCategories = await getCategories();
    console.log(availCategories);
    const randomCategory = await pickRandomCategory(availCategories);
    console.log(randomCategory);
    const joke = await getJoke(randomCategory);
    console.log(joke);
  } catch (err) {
    console.log(err);
  }
}

chuckJoke();
