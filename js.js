 const url = "//api.dictionaryapi.dev/api/v2/entries/en/";//this is API = application programming interface
//this will root of our dictionary because which the useer will tyoe and click to search nthe word
// the API will get a word with meaing and example 
 const result = document.querySelector(".result");
 const sound = document.querySelector("#sound");
 const btn = document.querySelector("#search-btn");
//this are the DOM which will connect to HTML

 btn.addEventListener('click', () =>{//this this a eventlistener function 
    //when the user click the button the function wil run 
    let inputword = document.querySelector("#input-word").value;//frist we take inputword which the user typed
    fetch(`${url}${inputword}`).then((response) => response.json()).then((data) => {//this t
       // is main line fetch(`${url}${inputword}`) this line will send the request to acctual API which the inputword is typed
       //.then((response) => response.json()) this line will recive the response from the API to JSON file
       // response.json()).then((data) this line will collect the data from json file and get in to the data
        result.innerHTML = //this will acctual output code
        `
        <div class="word">
                <h3>${inputword}</h3>
                <button onclick = "playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="deatils">
                <p>${data[0].meanings[0].partOfSpeech}</p>//accessing the partOfSpeech
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaing">
                ${data[0].meanings[0].definitions[0].definition}//accssing the meaning from JSONfile
            </p>
            <p class="word-example">
               ${data[0].meanings[0].definitions[0].example || ""}//same to examples
            </p>
        `
        const audioURL = data[0].phonetics.find(p => p.audio)?.audio;//this is about aduio

        sound.setAttribute("src", audioURL);
    })
    .catch(() =>{
        result.innerHTML = `<h3 class = "error">Couldn't Find The Word</h3>`;//this will shoe if the incrrect word is typed

    });
 });

 function playSound() {
    sound.play();
 };//sound function