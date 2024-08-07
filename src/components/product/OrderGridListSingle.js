import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import OrderModal from "../order/OrderModal";

const OrderGridListSingle = ({
  order,
  currency,
  spaceBottomClass
}) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);


  return (
    <Fragment>

      <div className="shop-list-wrap mb-30 mt-30">
        <div className="row">
          <div className="col-xl-12">
            <div className="order-list-content">
              <p>
                Order ID:
                <h5>
                  <Link to={'#'}>
                    {order.pkid}
                  </Link>
                </h5>
              </p>
              <p>Order Status: {order.status}</p>

              <p>Payment Status: {order.is_paid ? "Paid" : (
                "Pending"
              )}</p>
              <p>Amount: {currency.currencySymbol}{order.total_price}</p>

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  <button className="active" onClick={() => setModalShow(true)}>
                    View Items
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* order modal */}
      <OrderModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        order={order}
        currency={currency}
      // compareItem={compareItem}
      />

      < hr />
    </Fragment>
  );
};

OrderGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({})
};

export default OrderGridListSingle;
