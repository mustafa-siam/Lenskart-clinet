import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Layout/Home";
import Shop from "../Pages/Shop/Shop";
const router = createBrowserRouter([
  {
    path: "/",
    element:<Mainlayout></Mainlayout>,
    children:[{
      path:"/",
      element:<Home></Home>
    },{
      path:'/shop',
      element:<Shop></Shop>
    }]
  },
]);
export default router;