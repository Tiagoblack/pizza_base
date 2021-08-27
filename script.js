const c = el => document.querySelector(el);
const cl = el => document.querySelectorAll(el);


pizzaJson.map(({ img, name, price, description }, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    const item = `R$ ${price.toFixed(2).replace(".", ",")}`;
    //preencher as informações em pizzaItem
    //setando um atributo em cada pizza
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = item
    pizzaItem.querySelector('a').addEventListener('click', e => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        //fazendo um intervalo no modal com javascript 
        setTimeout(() => c('.pizzaWindowArea').style.opacity = 1, 200);

        // colocando as informações no modal
        c('.pizzaBig  img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('pizzaInfor--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace(".", ",")}`;;

    })



    c('.pizza-area').append(pizzaItem);
    // colocando as pizza em pizza-area

});