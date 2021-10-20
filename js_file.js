const taskContainer = document.querySelector(".task_container");
let globalStore=[];
console.log(taskContainer);
const generateNewCard=(taskData)=>
`
    <div class="col-sm-12 col-md-6 col-lg-4 " id=${taskData.id}>
    <div class="card">
    <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="card-body">

    <div class="card" style="width: 18rem;">
    <img src="${taskData.imageUrl}" class="card-img-top" alt="...">
    </div>
    <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
    </div>
    </div>
  `;

const loadInitialCardData = () =>{
    //localstorage to get tasky card data 
    const getCardData = localStorage.getItem("tasky");


    //convert to normal object
    const {cards} = JSON.parse(getCardData); //reverse of stringify

    //loop over those array of task object to create html card, inject it to dom
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforehand",generateNewCard(cardObject));
        
    //update our global storage
        globalStore.push(cardObject);
    }
    )


};


const saveChanges = ()=>{
    const taskData= {
        id : `${Date.now()}` ,  /*${} are use whenever the value inside them constantly change here 
                                 date.now() is used to generate unique id values*/
                                 //`` is used to prevent any harmul characters in our code
                                 //here we can't use imageurl as the key since it was used as an id before 
        imageUrl : document.getElementById("imageurl").value,
        taskTitle : document.getElementById("tasktitle").value,          //parent of dom is document
        taskType : document.getElementById("tasktype").value,
        taskDescription : document.getElementById("taskdescription").value
        
    };

    

  taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

  globalStore.push(taskData);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore})); //because we cannot directly push objects in local storage
                        //id                    //setItem is one of the methods of localStorage 
                                        //not only we use the localstorage so we need to provide a
                                        // unique id so it can be only used by us
                                        //json.stringify is used to convert the objets of object in case of just globalstore to an array


};
//issues

//page refreshes causes the data to get deleted
//local storage:
/*API-> application programming Interface*/

//features - delete , edit , open the card





