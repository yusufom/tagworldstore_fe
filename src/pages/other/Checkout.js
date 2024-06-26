import { Fragment } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useGetAllCartItemsQuery, useCreateOrderMutation, useStartCreateOrderMutation, useConfirmOrderMutation } from "../../store/apiSlice/cartApiSlice";
import useQuery from "../../hooks/userQuery";
import { instanceOf } from "prop-types";
import React from "react";
import { successToast } from "../../helpers/toast";

const Checkout = () => {
  let cartTotalPrice = 0;
  let [searchParams] = useSearchParams();

  let query = useQuery();

  let { pathname } = useLocation();
  console.log(searchParams.get("soc12sde"))
  console.log(typeof Boolean(searchParams.get("success")))
  console.log(searchParams.get("canceled"))
  const currency = useSelector((state) => state.currency);
  const [confirmOrder, { isLoading: confirmOrderLoading }] = useConfirmOrderMutation()


  React.useEffect(() => {
    const soc = searchParams.get("soc12sde")
    if (soc) {
      const success = Boolean(searchParams.get("success"))
      const cancelled = Boolean(searchParams.get("canceled"))
      if (success) {
        confirmOrder({ order_id: soc, status: "success" }).unwrap().then((res) => {
          console.log('res', res)
          window.location.href = "/checkout"
          successToast("Order was successfully placed")
        }).catch((err) => {
          console.log('err', err)
        })
      } else if (cancelled) {
        confirmOrder({ order_id: soc, status: "canceled" }).unwrap().then((res) => {
          console.log('res', res)
          window.location.href = "/checkout"
          successToast("Order was canceled")
        }).catch((err) => {
          console.log('err', err)
        })
      }
    }



  }, [searchParams, confirmOrder])

  // const { cartItems } = useSelector((state) => state.cart);
  const { data: cartItems, refetch } = useGetAllCartItemsQuery({ refetchOnMountOrArgChange: true });

  const [createOrder, { isLoading }] = useCreateOrderMutation()
  const [startCreateOrder, { isLoading: startCreateOrderLoading }] = useStartCreateOrderMutation()

  const lineitems = cartItems?.map((cartItem, key) => {

    return {
      price: cartItem.product.stripe_price,
      quantity: cartItem.quantity,
      // line_total: discountedPrice!= null? finalDiscountedPrice : finalProductPrice
    }
  })

  const lineitemsID = cartItems?.map((cartItem, key) => {

    return {
      id: cartItem.id.toString(),
    }
  })

  const handleCreateOrder = () => {

    startCreateOrder(lineitemsID).unwrap()
      .then((res) => {
        createOrder({ line_items: lineitems, pkid: res.pkid }).unwrap().then((res) => {
          // console.log('res', res)
          // refetch()
          window.location.href = res.url
        }).catch((err) => {
          console.log('err', err)
        });
      }).catch((err) => { });




    console.log('lineitems', lineitems)
  };



  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems?.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="text" />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems?.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.product.price,
                                cartItem.product.discount
                              );
                              const finalProductPrice = (
                                cartItem.product.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.product.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ).toFixed(2)
                                      : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button type="submit" className="btn-hover" onClick={handleCreateOrder}>Place Order</button>
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
