import {
  createBrowserRouter,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Layout/Home";
import Shop from "../Pages/Shop/Shop";
import CardDetails from "../Pages/Itemcard/CardDetails";
import Orders from "../Pages/Orders/Orders";
import Placedorder from "../Pages/Placedorder/Placedorder";
import ConfirmOrder from "../Pages/Orderdone/ConfirmOrder";
import Payment from "../Pages/Payment/Payment";
import Whislist from "../Pages/Whislist/Whislist";
import Login from "../Account/Login";
import PrivateRoute from "../Private routes/PrivateRoute";
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
    },{
      path:'/orderconfirm/:orderid',
      element:<ConfirmOrder></ConfirmOrder>
    },{
      path:'/payment',
      element:<Payment></Payment>
    },{
      path:"/whislist",
      element:<PrivateRoute><Whislist></Whislist></PrivateRoute> 
    },{
      path:"/login",
      element:<Login></Login>
    }]
  },
]);
export default router;