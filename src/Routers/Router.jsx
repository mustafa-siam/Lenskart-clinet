import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Layout/Home";
import Shop from "../Pages/Shop/Shop";
import CardDetails from "../Pages/Itemcard/CardDetails";
import Orders from "../Pages/Orders/Orders";
import Placedorder from "../Pages/Placedorder/Placedorder";
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
    },{
      path:'/detailscard/:id',
      element:<CardDetails></CardDetails>
    },{
      path:'/orders',
      element:<Orders></Orders>
    },{
      path:'/placedorder',
      element:<Placedorder></Placedorder>
    }]
  },
]);
export default router;