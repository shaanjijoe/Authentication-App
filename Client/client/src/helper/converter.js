
const convertToBase64 = (file) => {
    return new Promise((resolve,reject)=> {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload= () => {
            resolve(fileReader.result)  
        };

        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}

export default convertToBase64;

// The Promise is designed to resolve with the Base64 string upon successful loading (onload) or 
// reject with an error in case of any issues (onerror). 