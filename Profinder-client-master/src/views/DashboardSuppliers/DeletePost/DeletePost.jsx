import { deletePost } from "../../../services/redux/actions/actions";
import { useDispatch } from "react-redux";


const DeletePost = () => {
    const dispatch = useDispatch();
  
    const handleDelete = () => {
      dispatch(deletePost());
    };
  
    return (
      <button onClick={handleDelete}>Eliminar</button>
    );
  };
  
  export default DeletePost;