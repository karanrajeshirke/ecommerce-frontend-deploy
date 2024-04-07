import Layout from "../../src/components/layout/Layout";
import AdminMenu from "../../src/components/layout/AdminMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../src/context/Auth";
import Chart from "react-apexcharts";

const AdminProfile = () => {
  const [auth, setAuth] = useAuth();

  const [statusNames, setStatusNames] = useState([]);
  const [statusCount, setStatusCount] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [productCount, setProductCount] = useState([]);

  const [totalProducts, setTotalProducts] = useState("");
  const [ordersCount, setOrdersCount] = useState("");
  const [amount, setAmountCount] = useState("");

  const getStatusCount = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-deploy-3mwf.onrender.com/api/v1/product/getcount",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setStatusNames(response.data.namesArr);
      setStatusCount(response.data.valuesArr);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductCount = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-deploy-3mwf.onrender.com/api/v1/product/individualProductCount",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setProductNames(response.data.productNames);
      setProductCount(response.data.productCount);
    } catch (error) {
      console.log(error);
    }
  };

  const getAdminProfileOrder = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-deploy-3mwf.onrender.com/api/v1/product/admin-profile-details",
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      setTotalProducts(response.data.productsCount);
      setOrdersCount(response.data.ordersCount);
      setAmountCount(response.data.amount);
    } catch (error) {
      console.log(error);
    }
  };

  const changetoINR = (amount) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };
  useEffect(() => {
    getStatusCount();
    getProductCount();
    getAdminProfileOrder();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-2">
          <AdminMenu />
        </div>
        <div className="col-10   p-5">
          <div className="row ">
            <div className="admin-cards-list">
              <div className="admin-card 1">
                <div
                  className="admin-card_title title-white d-flex justify-content-center align-items-center flex-column "
                  style={{ height: "100%" }}
                >
                  <h3>Products</h3>
                  <h1>{totalProducts}</h1>
                </div>
              </div>

              <div className="admin-card 1">
                <div
                  className="admin-card_title title-white d-flex justify-content-center align-items-center flex-column "
                  style={{ height: "100%" }}
                >
                  <h3>Orders</h3>
                  <h1>{ordersCount}</h1>
                </div>
              </div>

              <div className="admin-card 1">
                <div
                  className="admin-card_title title-white d-flex justify-content-center align-items-center flex-column "
                  style={{ height: "100%" }}
                >
                  {" "}
                  <h3>Amount</h3>
                  <h2>{changetoINR(amount)}</h2>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="d-flex  mt-3 justify-content-around ">
                <Chart
                  options={{
                    title: {
                      text: "Status of Orders",
                      align: "center",
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                        fontFamily: "Arial",
                        color: "#333",
                      },
                    },
                    labels: statusNames,
                  }}
                  series={statusCount}
                  type="pie"
                  width="500"
                />

                <Chart
                  options={{
                    chart: {
                      type: "bar",
                    },
                    xaxis: {
                      categories: productNames,
                      title: {
                        text: "Products",
                      },
                    },
                    yaxis: {
                      title: {
                        text: "Sales Count",
                      },
                    },
                    title: {
                      text: "Product Sales Count",
                      align: "center",
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                        fontFamily: "Arial",
                        color: "#333",
                      },
                    },
                    colors: ["#FF5733"],
                  }}
                  series={[
                    {
                      name: "Sales Count",
                      data: productCount,
                    },
                  ]}
                  type="bar"
                  width="600"
                />
              </div>

              <div className="d-flex   flex-row-reverse mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
