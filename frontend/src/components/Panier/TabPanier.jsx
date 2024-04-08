// import { useEffect, useState } from "react";
// import ButtonNumberItems from "./ButtonNumberItems";

// function TabPanier() {
//   const [storeLists, setStoreLists] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:4242/storedata")
//       .then((res) => res.json())
//       .then((res) => setStoreLists(res));
//   }, []);

//   return (
//     <>
//       {storeLists.map((storeList) => {
//         return (
//           <p key={storeList.id}>
//           {storeList.name}, <ButtonNumberItems />, {storeList.price}*{numberItem}
//           {numberItem > 0 ? ": enable" : ": disable"}
//           </p>
//         );
//       })}
//     </>
//     );
// }

// export default TabPanier;
