import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import { useGetAllWishListQuery } from "../../store/apiSlice/productSlice";
import { useGetAllCartItemsQuery } from "../../store/apiSlice/cartApiSlice";
import OrderGridListSingle from "../../components/product/OrderGridListSingle";

const OrdergridList = ({
  orders,
  spaceBottomClass
}) => {
  const currency = useSelector((state) => state.currency);

  return (
    <Fragment>
      <h1>My Orders</h1>
      {orders?.map(order => {
        return (
          <div className="col-xl-4 col-sm-6" key={order.id}>
            <OrderGridListSingle
              spaceBottomClass={spaceBottomClass}
              order={order}
              currency={currency}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

OrdergridList.propTypes = {
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default OrdergridList;
