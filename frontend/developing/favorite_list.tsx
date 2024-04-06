// function FavoriteList() {
//   const userCustomList = ['기본', '추가'];
//   const [selectedItems, setSelectedItems] = useState(new Set());

//   const handleItemClick = (item:string) => {
//     setSelectedItems((prevSelectedItems) => {
//       // Create a new Set with previous selected items and add the new item
//       const newSelectedItems = new Set(prevSelectedItems);
//       newSelectedItems.add(item);
//       return newSelectedItems;
//     });
//   };

//   return userCustomList.map((item) => (
//     <button
//       type="button"
//       key={item}
//       onClick={() => handleItemClick(item)}
//       aria-label={item}
//       disabled={selectedItems.has(item)} // Disable button if item is already selected
//     >
//       {item}
//     </button>
//   ));
// }

// export function Favorite({ props }: { props: CellContext<ProductTableProps, any> }) {
//   const x = () => console.log(props.row.original.productInfo.product_id);
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <input className="star mx-auto" type="checkbox" id="favorite" onClick={() => x()} />
//       </DialogTrigger>
//       <DialogContent className="w-[400px] max-h-[500px]">
//         <DialogHeader>
//           <DialogTitle>제품 저장</DialogTitle>
//           <FavoriteList />
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>

//   );
// }
