const WHATSAPP="5511926348023";
const products=[
  // CADASTRE SEUS PRODUTOS AQUI:
  // {id:1,name:"Nome",price:99.90,category:"Camisas",image:"images/produto.jpg",description:"...",featured:true}
];
let cart=JSON.parse(localStorage.getItem("lugheri_cart")||"[]");
const money=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const grid=document.getElementById("productGrid"), featured=document.getElementById("featuredGrid");
function card(p){return `<article class="card"><div class="photo">${p.image?`<img src="${p.image}" alt="${p.name}">`:"Foto do produto"}</div><div class="card-body"><span class="cat">${p.category}</span><h3>${p.name}</h3>${p.description?`<small>${p.description}</small>`:""}<div class="price">${money(p.price)}</div><div class="card-actions"><button class="buy" onclick="add(${p.id})">Comprar</button><button onclick="add(${p.id})">Adicionar</button></div></div></article>`}
function render(list=products){grid.innerHTML=list.length?list.map(card).join():'<p style="color:#aaa">Nenhum produto cadastrado ainda. Adicione seus produtos no arquivo <b>script.js</b>.</p>';featured.innerHTML=products.filter(p=>p.featured).map(card).join()||'<p style="color:#aaa">Você poderá escolher aqui quais produtos serão destacados.</p>'}
function renderCats(){let cats=["Todos","Roupas","Camisas","Bermudas","Acessórios","Perfumes","Correntes","Outros"];document.getElementById("categories").innerHTML=cats.map(c=>`<button onclick="filterCat('${c}')">${c}</button>`).join("")}
function filterCat(c){render(c==="Todos"?products:products.filter(p=>p.category===c))}
function add(id){let p=products.find(x=>x.id===id);if(!p)return;let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openCart()}
function save(){localStorage.setItem("lugheri_cart",JSON.stringify(cart));renderCart()}
function renderCart(){let box=document.getElementById("cartItems"),total=0,count=0;box.innerHTML=cart.map(i=>{let p=products.find(x=>x.id===i.id);if(!p)return"";total+=p.price*i.qty;count+=i.qty;return `<div class="cart-row"><div><strong>${p.name}</strong><br><small>${money(p.price)} cada</small></div><div class="qty"><button onclick="change(${i.id},-1)">−</button>${i.qty}<button onclick="change(${i.id},1)">+</button><button onclick="removeItem(${i.id})">×</button></div></div>`}).join("")||'<p style="color:#aaa">Seu carrinho está vazio.</p>';document.getElementById("cartTotal").textContent=money(total);document.getElementById("cartCount").textContent=count}
function change(id,n){let i=cart.find(x=>x.id===id);if(i){i.qty+=n;if(i.qty<=0)cart=cart.filter(x=>x.id!==id)}save()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length)return alert("Adicione pelo menos um produto ao carrinho.");document.getElementById("checkout").classList.add("show")};
document.getElementById("closeCheckout").onclick=()=>document.getElementById("checkout").classList.remove("show");
document.getElementById("checkoutForm").onsubmit=e=>{e.preventDefault();let total=0;let lines=cart.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return `• ${p.name} | ${i.qty}x | ${money(p.price)}`}).join("\n");let msg=`Olá, LUGHERI STORE! Quero fazer um pedido.\n\n${lines}\n\nTotal: ${money(total)}\n\nNome: ${name.value}\nTelefone: ${phone.value}\nEndereço: ${address.value}\nForma de pagamento: ${payment.value}`;window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank")};
document.getElementById("searchInput").oninput=e=>{let q=e.target.value.toLowerCase();render(products.filter(p=>(p.name+" "+p.category+" "+(p.description||"")).toLowerCase().includes(q)))};
document.getElementById("searchBtn").onclick=()=>document.getElementById("searchInput").focus();
document.querySelectorAll(".category-grid button").forEach(b=>b.onclick=()=>{document.getElementById("produtos").scrollIntoView();filterCat(b.dataset.cat)});
document.querySelector(".menu-btn").onclick=()=>document.querySelector(".nav").classList.toggle("mobile");
renderCats();renderCart();render();
