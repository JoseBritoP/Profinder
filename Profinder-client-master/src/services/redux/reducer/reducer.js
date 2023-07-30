import {
  GET_ALL_SUPPLIERS,
  GET_CATEGORIES,
  SEARCH_PROFESSIONALS,
  APPLY_FILTERS,
  GET_OCUPATION_BY_NAME,
  UPDATE_PROFESIONAL,
  POST_PROFESIONAL,
  GET_INFO_PROFESIONALS,
  DELETE_POST,
  UPDATE_POST,
  GET_ID_PROFESIONAL,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  GET_FAVORITES,
  CLEAN_DETAIL,
} from "../actionsTypes/actionsType";
import { filterSuppliers } from "../filters/reduxFilters";

const initialState = {
  location: [],
  suppliers: [],
  ocupations: [],
  backup: [],
  categories: [],
  clients: [],
  profesionalId: [],
  filteredCategories: [],
  filteredSuppliers: [],
  suppliersByname: [],
  profesionales: [],
  feedback: null,
  error: null,
  filters: {
    category: "Categorias",
    ocupation: "Selecciona una categoria",
    rating: "Rating",
    genre: "Genero",
  },
  session: [],
  favorites: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUPPLIERS:
      return {
        ...state,
        backup: action.payload,
        suppliers: filterSuppliers(action.payload, state.filters),
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_ID_PROFESIONAL:
      return {
        ...state,
        profesionalId: action.payload,
      };
    //! esta es para traer los profesionales por el nombre de la ocupacion y renderizarlos en categories, se implementa en la searchBar
    case GET_OCUPATION_BY_NAME:
      return {
        ...state,
        suppliersByname: action.payload,
      };
    //! actualizar profesional // preguntar cual es el estado a actualizar
    case UPDATE_PROFESIONAL:
      return {
        ...state,
        session: action.payload,
      };
    case APPLY_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filter]: action.payload.value,
        },
      };
    case SEARCH_PROFESSIONALS:
      return {
        ...state,
        professionals: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        profesionalId:[],
      };

    case "GET_ALL_CLIENTS":
      return {
        ...state,
        clients: action.payload,
      };
    case "UPDATE_CLIENT":
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id === action.payload.id ? action.payload : client
        ),
      };
    case POST_PROFESIONAL:
      return {
        ...state,
        profesionales: action.payload,
      };
    case "UPDATE_FEEDBACK_SUCCESS":
      return {
        ...state,
        feedback: action.payload,
        error: null,
      };
    case "UPDATE_FEEDBACK_ERROR":
      return {
        ...state,
        feedback: null,
        error: action.payload,
      };
    case GET_INFO_PROFESIONALS:
      return {
        ...state,
        profesionales: action.payload,
      };

    case UPDATE_POST: {
      const updatedPost = action.payload;
      const updatedProfesionales = state.profesionales.map((profesional) => {
        if (profesional.id === updatedPost.id) {
          return { ...profesional, ...updatedPost };
        } else {
          return profesional;
        }
      });
      return { ...state, profesionales: updatedProfesionales };
    }

    case DELETE_POST: {
      const { postId } = action.payload;
      const updatedProfesionalesForDelete = state.profesionales.map(
        (profesional) => {
          if (profesional.posts.find((post) => post.id === postId)) {
            const updatedPosts = profesional.posts.filter(
              (post) => post.id !== postId
            );
            return { ...profesional, posts: updatedPosts };
          } else {
            return profesional;
          }
        }
      );
      return { ...state, profesionales: updatedProfesionalesForDelete };
    }
    // Agregar un profesional como favorito
    case ADD_FAVORITE: {
      console.log(action.payload);
      const { profesionalId } = action.payload;
      if (!state.favorites.includes(profesionalId)) {
        return {
          ...state,
          favorites: [...state.favorites, profesionalId],
        };
      }
      return state;
    }
    // Remover un profesional como favorito
    case REMOVE_FAVORITE: {
      //
      console.log("Que me llega en remove");
      console.log(action.payload);
      const profesionalId = action.payload;
      return {
        ...state,
        favorites: [...state.favorites.filter((id) => id !== profesionalId)],
      };
    }
    // Obtener los profesionales favoritos del cliente
    case GET_FAVORITES: {
      const favoritesList = action.payload;
      // console.log("" + favoritesList)
      console.log("---");
      console.log(favoritesList.map((fav) => fav.id));
      // console.log(favoritesList.map((fav) => fav.id));
      return {
        ...state,
        favorites: favoritesList,
      };
    }
    //! caso por default
    default:
      return { ...state };
  }
};

export default reducer;
