import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import UserSalesChart from "./UserSalesChart";
import MonthlySalesChart from "./MonthlySalesChart";
import ProductSalesChart from "./ProductSalesChart";
import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers, userSales } from "../../actions/userActions";
import { allAppointments } from "../../actions/appointmentActions";
import {
  monthlySalesChart,
  productSalesChart,
} from "../../actions/chartActions";
import AppointmentLocationsChart from "./AppointmentLocationsChart";
import PaidNotPaidChart from "./PaidNotPaidChart";
import PaymentMethodChart from "./PaymentMethodChart";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
  );
  const { customerSales } = useSelector((state) => state.customerSales);
  const { salesPerMonth } = useSelector((state) => state.salesPerMonth);
  const { productSales } = useSelector((state) => state.productSales);
  const { appointments } = useSelector((state) => state.allAppointments);

  // Calculate out of stock products
  const outOfStock = products.filter((product) => product.stock === 0).length;

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
    dispatch(userSales());
    dispatch(monthlySalesChart());
    dispatch(productSalesChart());
    dispatch(allAppointments());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="my-4 d-flex align-items-center">
            <img
              src="/images/tupt_logo.png"
              style={{
                width: "150px",
                height: "150px",
                marginRight: "20px",
              }}
              alt="Logo"
            />
            <div>
              <h2 className="mb-2">Welcome to the Admin Dashboard</h2>
              <p className="mb-0">
                Your central hub for managing all aspects of your business. Gain
                insights into product sales, user activity, and order trends
                with intuitive charts and real-time data. Streamline your
                operations and make informed decisions to drive growth and
                success.
              </p>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Admin Dashboard"} />

              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Sales Overview
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-area">
                        <ProductSalesChart data={productSales} />
                      </div>
                      <div className="chart-area">
                        <PaidNotPaidChart orders={orders} />
                      </div>
                      <div className="chart-area">
                        <PaymentMethodChart orders={orders} />
                      </div>
                      <div className="row">
                        <div className="col-lg-6 mb-4">
                          <div className="card shadow">
                            <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">
                                TOTAL AMOUNT SOLD
                              </h6>
                            </div>
                            <div className="card-body">
                              <div className="text-center">
                                <h2 className="text-primary">
                                  ₱
                                  {totalAmount &&
                                    totalAmount.toLocaleString("en-PH", {
                                      maximumFractionDigits: 2,
                                    })}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 mb-4">
                          <div className="card shadow">
                            <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">
                                MERCHANDISE OUT OF STOCK
                              </h6>
                            </div>
                            <div className="card-body">
                              <div className="text-center">
                                <h2 className="text-primary">{outOfStock}</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Monthly Sales
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-area">
                        <MonthlySalesChart data={salesPerMonth} />
                      </div>

                      <div className="row">
                        <div className="col-lg-6 mb-4">
                          <div className="card shadow">
                            <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">
                                USERS COUNT
                              </h6>
                            </div>
                            <div className="card-body">
                              <div className="text-center">
                                <h2 className="text-primary">{users.length}</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card shadow">
                            <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">
                                MERCHANDISE COUNT
                              </h6>
                            </div>
                            <div className="card-body">
                              <div className="text-center">
                                <h2 className="text-primary">
                                  {products.length}{" "}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Users Sale's Report
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-area">
                        <UserSalesChart data={customerSales} />
                      </div>

                      <div className="row">
                        <div className="col-lg-6 mb-4">
                          <div className="card shadow">
                            <div className="card-header py-3">
                              <h6 className="m-0 font-weight-bold text-primary">
                                USERS ORDER COUNT
                              </h6>
                            </div>
                            <div className="card-body">
                              <div className="text-center">
                                <h2 className="text-primary">
                                  {orders.length}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Appointments Overview
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-area">
                        <AppointmentLocationsChart
                          appointments={appointments}
                        />{" "}
                        {/* Pass appointments data as prop */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const DashboardItem = ({ color, title, count, link }) => (
  <div className="col-xl-3 col-sm-6 mb-3">
    <div className={`card text-white bg-${color} o-hidden h-100`}>
      <div className="card-body">
        <div className="text-center card-font-size">
          {title}
          <br /> <b>{count}</b>
        </div>
      </div>
      {link && (
        <Link className="card-footer text-white clearfix small z-1" to={link}>
          <span className="float-left">View Details</span>
          <span className="float-right">
            <i className="fa fa-angle-right"></i>
          </span>
        </Link>
      )}
    </div>
  </div>
);

export default Dashboard;
