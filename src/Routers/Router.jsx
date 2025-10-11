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
import Dashboard from "../Dashboard/Dashboard";
import OrderHistory from "../Dashboard/OrderHistory";
import UserProfile from "../Dashboard/userProfile";
import UpdateProfile from "../Dashboard/UpdateProfile";
import AddItem from "../Dashboard/AdminBoard/AddItem";
import ManageItems from "../Dashboard/AdminBoard/ManageItems";
import Editglasscart from "../Dashboard/AdminBoard/Editglasscart";
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
    },
  ]
  },{
 path:"/dashboard",
      element:<Dashboard></Dashboard>,
      children:[
        //user dashboard
        {
        path:"orderHistory",
        element:<OrderHistory></OrderHistory>
      },{
        path:"userprofile",
        element:<UserProfile></UserProfile>
      },{
        path:"updateProfile",
        element:<UpdateProfile></UpdateProfile>
      },
      //Admin dashboard
      {
        path:"additem",
        element:<AddItem></AddItem>
      },{
        path:"manageitem",
        element:<ManageItems></ManageItems>
      },{
        path:"updateglass/:id",
        element:<Editglasscart></Editglasscart>
      }]
  }
]);
export default router;