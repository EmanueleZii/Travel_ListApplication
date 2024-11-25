import { useState } from "react";

const InitialItems = [
  {id:1, description:"Passport", quantity:2, packed:false},
  {id:2, description:"Socks", quantity:12, packed:false},
  {id:3, description:"Bags", quantity:16, packed:true},
];

export default function App(){
 return (
 <div className="app">
    <Logo />
    <Form />
    <PackingList />
    <Stats />
  </div>
 );
}

function Logo(){
  return (
    <h1> Far Away </h1>
    );
}

function Form()
{
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem ={description, quantity, packed: false, id: Date.now()};
   
  }

  return (
   <form className="add-form" onSubmit={handleSubmit}>
    <h3> What do you need for your trip?</h3>
    <select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
     {Array.from({length: 20},
      (_,i)=> i + 1 )
      .map( num => 
      <option value={num} key={num} > {num} </option>
      )}
    </select>
    <input type="text" placeholder="item..." value={description} onChange={(e)=>setDescription(e.target.value)} />
    <button className="btn">Add</button>
   </form>
    );
}

function PackingList(){
  return (
    <div className="list">
      <ul>
      {InitialItems.map((item) => (
        <Item item={item} key={item.id} />
      ))}
      </ul>
    </div>
  );
}

function Item({item})
{
 return <li>
   <span style={item.packed ? {textDecoration:'line-through'} : {}}>
    {item.quantity} {item.description}
    </span>
    <button className="btn">&times;</button>
  </li>
}

function Stats(){
  return (
    <footer> 
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
    );
}