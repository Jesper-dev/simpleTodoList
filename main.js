const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

//Detta är ett annat sätt att skapa functions på
const generateTemplate = todo =>{
    //Skapar en ny list item med det vi skriv i add new todo
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    //Addar/Append nya itemet vi skapade där uppe till ULen
    list.innerHTML += html;

};
    
addForm.addEventListener("submit", e =>{
    e.preventDefault();
    /*Sparar det man skriver i add form texten i var todo
    trim() kan man använda på srings för att få bort whitespace, alltså massa mellanrum*/
    const todo = addForm.add.value.trim();
    
    /*Säger att todo måste ha bokstäver, eller en length kan man också säga. Om den inte har det så blir värdet 0.
    0 är falsey så alltså blir detta false om todo inte har en length och då går inte if statement och genertateTemplate() körs inte.
    Har den en length så blir värdet 1 och 1 truesey och då körs allt som det ska.*/
    if(todo.length){
        generateTemplate(todo);
        addForm.reset();
    }
    
});

//Delete todos
//Sätter en event listener på hela ULen
list.addEventListener("click", e =>{
    //Kollar ifall vi klickar på ett element som har en class av delete.
    if(e.target.classList.contains("delete")){
        //Om elementet har klassen delete så raderar vi dess parent element vilket i detta fall är LIn.
        e.target.parentElement.remove();
    }
});


const filterTodos = (term) =>{
    /*List.children är en HTML Collection och vi kan inte använda array methods på en HTML collection.
    Så vi gör om den till en array med array.from()*/

    //Innehåller den inte termen vi skriver så får den klassen filtered
    Array.from(list.children)
      .filter((todo) => !todo.textContent.toLowerCase().includes(term))
      .forEach((todo) => todo.classList.add("filtered"))
    
      //Innehåller den termen vi skriver så tar vi bort klassen filtered ifall den hade klassen filtered på sig
      Array.from(list.children)
      .filter((todo) => todo.textContent.toLowerCase().includes(term))
      .forEach((todo) => todo.classList.remove("filtered"))
};

//KeyUP event
search.addEventListener("keyup", () =>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});