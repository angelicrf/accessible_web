const callForm = () =>{
    document.querySelector("#myForm").addEventListener('submit', newCallForm)
}
var changeLoading = false
const newCallForm = async (e) => {
    e.preventDefault()
    const inputValue = document.querySelector("#url").value
    if(inputValue === ''){
        alert("url is empty")
    }else{
       // const newString = inputValue.substr(0, inputValue.length)
        console.log(inputValue)
        //changeLoading = true
        
        var myRequest = new Request(`/api/result?url=${inputValue}`);
        const response = fetch(myRequest)
        .then(response => {
            setSpinner(false);
           const contentType = response.headers.get('content-type');
           if (!contentType || !contentType.includes('application/json')) {
             throw new TypeError("Oops, we haven't got JSON!");
           }
           return response.json();
        })
        .then(data => {
            setSpinner()
            const {result} = data;
            receiveData(result)
        })
        .catch(error => {
            console.error(error)
            setSpinner(false)
        })
    }
    
}
const receiveData = (allIssues) => {
    setSpinner(false)
    const getIssues = document.querySelector("#allIssues")
    getIssues.innerHTML = ''
    if(allIssues.length == 0){
      getIssues.innerHTML = '<h3>There is an Issue</h3>'
    }else{
        allIssues.issues.forEach(data => {
            console.log(data)
           const thisOutput = `<div class="card mb-5">
            <div class="card-body">
            <h4>${data.message}</h4>
            <p><div class="bg-light my-3 p-3">
            ${convertContexts(data.context)}
            </div> </p>
            <p>
            <div class="bg-secondary text-light p-2">
            Code: ${data.code}
            </div>
            </p>
            </div>
            </div>`
            getIssues.innerHTML += thisOutput
        })
    }
}
const convertContexts = (html) => {
    return html.replace( /&/g, '&amp;')
    .replace(/</g, '&alt;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&alt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
const setSpinner = (isLoaded = true) => {

    const loader = document.querySelector("#mySpinner");
    if(isLoaded){
        loader.style.display = "block"
    }else{
    loader.style.display = "none"
    }
}
     callForm()