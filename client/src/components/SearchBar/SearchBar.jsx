// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getOcupationsByName } from "../../services/redux/actions/actions";
// import { Input, Box, Image } from "@chakra-ui/react";
// import notfound from "../../assets/defaultImages/notfound.jpg";

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [name, setName] = useState("");
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     dispatch(getOcupationsByName());
//   }, [dispatch]);

//   function handleInputChange(event) {
//     const value = event.target.value;
//     const regex = /^[a-zA-Z\s]*$/;
//     if (regex.test(value)) {
//       setName(value);
//       setError(false);
//     }
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     const response = dispatch(getOcupationsByName(name));
//     console.log(response);
//     setName("");
//   }

//   return (
//     <Box display="flex" alignItems="center" justifyContent="center">
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="txt"
//           value={name}
//           onChange={handleInputChange}
//           onKeyDown={(event) => {
//             if (event.key === "Enter") {
//               handleSubmit(event);
//             }
//           }}
//           placeholder="🔍"
//           size="md"
//           maxWidth="md"
//           borderRadius="md"
//         />
//       </form>
//       {error && (
//         <Image src={notfound} alt="Error" maxWidth="md" mt={4} />
//       )}
//     </Box>
//   );
// };

// export default SearchBar;
