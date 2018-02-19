
// var getPathTree = () => fetch("http://localhost:8080/file/D:\\ROOT")
//     .then((result)=> result.json().then(res => {return res}))

var serverPath = "http://localhost:8080/file/";

var getPathTree = (route) => fetch(serverPath + route);

var  elementDelete = (route) => {
    var url = serverPath + route;
    var fetchOptions ={
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
        },
    }
    return fetch(url, fetchOptions);
} 

var elementCreate = (path, name, type) => {
    console.log(path);
    var url = serverPath + type;
    var fetchOptions ={
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({ path : path , name : name})
    }
    return fetch(url, fetchOptions);
}

export { getPathTree, elementDelete, elementCreate };