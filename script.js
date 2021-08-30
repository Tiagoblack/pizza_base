const c = el => document.querySelector(el);
const cs = el => document.querySelectorAll(el);
let contQd = 1;
let quant;
let modalKey;
cart = [];
var quantArray;




//Listagens das pizzas

pizzaJson.map(({ img, name, price, description }, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //preencher as informações em pizzaItem
    //setando um atributo em cada pizza
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${price[0].toFixed(2).replace(".", ",")}`;
    pizzaItem.querySelector('a').addEventListener('click', e => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key;
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        //fazendo um intervalo no modal com javascript 
        setTimeout(() => c('.pizzaWindowArea').style.opacity = 1, 200);
        console.log(pizzaJson[key]);
        let contQd = 1;

        // colocando as informações no modal
        c('.pizzaBig  img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        //removendo o selected da class pizzaInfo--size
        c('.pizzaInfo--size.selected').classList.remove('selected');
        // loop para preencher o modal
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex === 2) size.classList.add('selected');
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            var quantArray = c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[2].toFixed(2).replace(".", ",")}`;
            c('.pizzaInfo--qt').innerHTML = contQd;
            // alterar os preços do modal conforme o tamanho da pizza
            size.addEventListener('click', () => {
                c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[sizeIndex].toFixed(2).replace(".", ",")}`;
                c('.pizzaInfo--size.selected').classList.remove('selected')
                size.classList.add('selected');

                //pizzaJson[key].price[sizeIndex]);

                let quant = pizzaJson[key].price[sizeIndex].toFixed(2);
                console.log('quant', parseFloat(quant));



            });
        });
    })



    // colocando as pizza em pizza-area
    c('.pizza-area').append(pizzaItem);

});




// Evento para fechar modal

const closeModal = () => {
    setTimeout(() => {
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'none';
    }, 200)
};

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(el => {
    el.addEventListener('click', closeModal)
})



//Eventos encremento e decremento da quatidade do modal


quantValueNext = () => {
    contQd++
    let valueEnd = contQd * quant
    parseInt(valueEnd);
    console.log(contQd);
    console.log(valueEnd);

    //  quantArray ;
    c('.pizzaInfo--qt').innerHTML = contQd;
    c('.pizzaInfo--actualPrice').innerHTML = `R$ ${valueEnd.toFixed(2).replace('.', ',')}`;



}
quantValuePre = () => {
    var ElementDoomMenos = c('.pizzaInfo--qt');
    if (contQd > 1) {
        contQd--;
        // var subValue = contQd * quant
        //parseInt(subValue);
        ElementDoomMenos.innerHTML = contQd;
        //c('.pizzaInfo--actualPrice').innerHTML = `R$ ${subValue.toFixed(2)}`;
    }
}

c('.pizzaInfo--qtmais').addEventListener('click', quantValueNext);
c('.pizzaInfo--qtmenos').addEventListener('click', quantValuePre);
//Abrir carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {

    let size = c('.pizzaInfo--size.selected').getAttribute('data-key');
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex(item => item.identifier == identifier);
    if (key > -1) {
        cart[key].qt += contQd;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: contQd
        })

    }

    console.log(cart);
    closeModal();
    updateCart()
});



const updateCart = () => {

    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        for (let i in cart) {
            let pizzaItem = pizzaJson.find(item => item.id === cart[i].id);
            let cartItem = c('.models .cart--item').cloneNode(true);

            cartItem.querySelector('img').src = pizzaItem.img;



            c('.cart').append(cartItem);
        }




    } else {
        c('aside').classList.remove('show');

    }

}