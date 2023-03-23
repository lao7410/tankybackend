console.log("ENTRAMOS AL FRONT DE INDEX DE PUBLIC")

//AGREGAR PRODUCTO
const productForm = document.getElementById("form");
console.log("a ver1")
productForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const body = {};
  const inputsForms = Array.from(productForm.elements);
  let emptyValue;
  inputsForms.forEach(({ name: field, value }, index) => {
    if (index !== inputsForms.length - 1) {
      console.log("a ver 2")
      if(!value) emptyValue = true
      body[field] = value;
    }        
  });
  if(emptyValue){
    window.alert("Ingrese todos los campos")
    return
  }
  console.log("a ver3")
  const data = await fetch("http://localhost:8080/api/products/", {method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify(body),
  });
  
  const { redirectUrl, message } = await data.json();
  console.log("a ver 4")
  if (data.status === 200) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = `${redirectUrl}/${message}`;
  }
});

//CREAR CARRITO
const newCartForm = document.getElementById("newCart");
newCartForm?.addEventListener("submit", async (evt) => {
evt.preventDefault()
const data = await fetch("http://localhost:8080/api/carts/", {method: "POST"})
const parsedData = await data.json()
alert(`Carrito creado. ID NUMERO: ${parsedData.id}`)
})

//BUSCAR CARRITO X ID
const searchForm = document.getElementById("searchCart");
searchForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const id = searchForm.elements["cartId"].value;
  if (!id) {
    alert("Ingrese un id");
    return;
  }
    const data = await fetch(`http://localhost:8080/api/carts/${id}`);
  const cart = await data.json();
  if (cart) {
    window.location.href = `http://localhost:8080/carts/${id}`;
  } else {
    window.alert("El carrito no existe");
  }
});