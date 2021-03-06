import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import "../assets/css/Sign.css";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import navUrls from "./../constant/navUrls";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./../redux/actions/user";
import constants from "../constant/RequestUrls";
import { Helmet } from "react-helmet";
import { auth } from "../firebase";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();
  const { items } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  // console.log(items);

  function addItemToCart(item) {
    return new Promise((resolve, reject) => {
      auth.currentUser &&
        auth.currentUser.getIdToken(true).then((idToken) => {
          const headers = {
            "Content-Type": "application/json",
            Authorization: idToken,
          };
          axios
            .post(
              `${constants.base_url}${constants.cart}/${item.product.uuid}`,
              {
                quantity: item.quantity,
                color: item.color,
              },
              { headers }
            )
            .then((res) => {
              console.log(res);
              resolve(res);
            })
            .catch((err) => {
              console.log(err.response);
              reject(err);
            });
        });
    });
  }

  async function addItemsToCart() {
    for (let i in items) {
      await addItemToCart(items[i]);
    }
    history.goBack();
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        let response = await login(values.email, values.password);
        dispatch(addUser(response.user.displayName));
        addItemsToCart();
      } catch (error) {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            Swal.fire({ text: "Incorrect Username/Password", icon: "error" });
            // alert(
            //   "There is no user account with this email. Please SignUp first."
            // );
            break;
          case "auth/wrong-password":
            Swal.fire({ text: "Incorrect Username/Password", icon: "error" });
            // alert("Please check your password again.");
            break;
          default:
            Swal.fire({
              text: `${error.message}`,
              icon: "error",
            });
          // alert(error.message);
        }
      }

      setLoading(false);
    },
  });
  // console.log(currentUser.getIdToken());
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Sign In | EMotorad | Best Electric Bicycle and Electric Bike
        </title>
      </Helmet>
      <Header />
      <section id="sign">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="form-box">
                <form onSubmit={formik.handleSubmit}>
                  <h2 className="mb-4">
                    Sign <span className="pri">In</span>
                  </h2>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your Email"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your Password"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      disabled={loading}
                      className="form-control"
                      type="Submit"
                      defaultValue="Sign In"
                      name="submit"
                    />
                  </div>
                  <hr />
                  <p>
                    <Link to={`${navUrls.resetPassword}`}>
                      Forgot Password?
                    </Link>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <Link to={`${navUrls.signUp}`}>Sign Up</Link>
                  </p>
                  <hr />
                  {/* <p>
                    Or connect with <a href="">Facebook</a> or{" "}
                    <a href="">Google</a>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default SignIn;
