
export default function Item({item, OnDeleteItem, OnToggleItem}) {
    return (
    <li>
       <input type="checkbox" value={item.packed} onChange={()=>OnToggleItem(item.id)} />
       <span style={item.packed ? {textDecoration:'line-through'} : {}}>
       {item.quantity} {item.description}
       </span>
       <button className="btn" onClick={()=>OnDeleteItem(item.id)}>&times;</button>
     </li>
    );
   }
   