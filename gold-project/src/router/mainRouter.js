import MainLayout from "../Component/common/MainLayout";
import Dashboard from './../Component/Dashboard';
import AddTotal from "../Component/Quantity/AddQuantity";
import User from '../Component/User/User';
import Transaction from '../Component/User/Transaction';
import SilverRate from '../Component/Rate/AllSilverRate';
import GoldRate from '../Component/Rate/AllGoldRate';
import Edit from "../Component/Quantity/EditGold";
import EditSilver from "../Component/Quantity/EditSilver";
import AddForm from "../Component/Rate/AddRate";



const mainRouter = {
    path: 'dashboard',
    Component: MainLayout,
    children: [
        { path: '', Component: Dashboard },
        { path: 'add', Component: AddForm },
        { path: 'Total', Component: AddTotal },
        // { path: 'profile', Component:Profile },
        { path: 'User', Component: User },
        { path: 'user/:phoneNo', Component: Transaction },
        { path: 'silverrate', Component: SilverRate  },
        { path: 'goldrate', Component: GoldRate },
        { path: 'edit', Component: Edit },
        { path: 'editsilver', Component: EditSilver },


    ],
};

export default mainRouter