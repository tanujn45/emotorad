import React, { useState, useEffect } from "react";
import dots from "../assets/img/design/dots.svg";
import Button from "../components/Button";
import testrideSide from "../assets/img/backgrounds/testride-side-min.jpeg";
import moment from "moment";
import { useFormik } from "formik";
import axios from "axios";
import "../assets/css/TestRide.css";
import constants from "../constant/RequestUrls";
import Header from "./../components/Header";
import Footer from "../components/Footer";
import { Link, useHistory } from "react-router-dom";
import navUrls from "./../constant/navUrls";
import { HashLink } from "react-router-hash-link";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

function TestRide() {
  const todays_date_obj = new Date();
  const todays_date = moment(todays_date_obj).format("YYYY-MM-DD");
  const [dealers, setDealers] = useState([]);
  const [selectedDealerAddress, setSelectedDealerAddress] = useState(
    "Select a dealer"
  );
  const [reRender, setReRender] = useState(true);
  const [cities, setCities] = useState([]);
  const [address, setaddress] = useState("");
  const history = useHistory();

  useEffect(() => {
    getAllDealers();
  }, []);

  function getAllDealers() {
    axios
      .get(`${constants.base_url}${constants.dealer}`)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          let temp = res.data.payload.dealers;
          var cities = [];
          temp.forEach((item, i) => {
            if (
              item.city != null &&
              item.city != undefined &&
              !cities.includes(item.city.toLowerCase())
            )
              cities.push(item.city.toLowerCase());
          });
          setDealers(temp);
          cities.sort();
          setCities(cities);
          setReRender(!reRender);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: `${err.response.data.message}`,
          icon: "error",
        });
        // alert(err.response.data.message);
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      organisation_name: "empty",
      city: "select",
      email: "",
      phone_number: "",
      preferred_date: "",
      preferred_time: "",
      bike_name: "",
      dealer_id: "select",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      axios
        .post(`${constants.base_url}${constants.test_ride}`, values)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              text: "Congratulations your test ride is confirmed!",
              icon: "success",
            });
            // alert("Congratulations your test ride is confirmed!");
            formik.handleReset();
            setSelectedDealerAddress("Select a Dealer");
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            text: `${err.response.data.message}`,
            icon: "error",
          });
          // alert(err.response.data.message);
        });
    },
  });

  function onDealerChange(e) {
    setaddress("something will come here");
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Test Ride | EMotorad | Best Electric Bicycle and Electric Bike
        </title>
        <meta
          name="description"
          content="Test ride the electric revolution at your nearest city, See what it feels like Indian to ride an Ebike"
        />
      </Helmet>

      <Header />
      <section id="test-hero">
        <div className="container">
          <h3 className="pri">Book a test ride</h3>
          <h1>Experience unparallel</h1>
          <img src={dots} className="dots mb-4" alt="Dots" />
          <HashLink smooth to={`${navUrls.testride}#book-testride`}>
            <Button text="Book now" />
          </HashLink>
        </div>
      </section>

      <section id="book-testride">
        <div className="row justify-content-center no-gutters">
          <div className="col-lg-6 col-md-6 form-img">
            <img src={testrideSide} alt="Cycle" />
          </div>
          <div className="col-lg-6 col-md-6 align-content-center">
            <form onSubmit={formik.handleSubmit}>
              <h3 className="mb-5">Book a test ride!</h3>
              <div className="form-row form-group">
                <div className="col-lg-12 col-md-12">
                  <input
                    required
                    className="mb-4"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
                {/* <div className="col-lg-6 col-md-6">
                  <input
                    className="mb-4"
                    type="text"
                    name="organisation_name"
                    id="organisation_name"
                    placeholder="Organisation Name"
                    onChange={formik.handleChange}
                    value={formik.values.organisation_name}
                  />
                </div> */}
              </div>

              <div className="form-row form-group">
                <div className="col-lg-6 col-md-6">
                  <input
                    required
                    className="mb-4"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <div className="col-lg-6 col-md-6">
                  <input
                    required
                    className="mb-4"
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                    title="Phone Number should be 10 digits"
                    placeholder="Contact Number"
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                  />
                </div>
              </div>
              <div className="form-row form-group">
                <div className="col-lg-6 col-md-6">
                  <label for="bike_name">Choose your City:</label>
                  <select
                    className="mb-4"
                    required
                    id="city"
                    name="city"
                    onChange={(e) => {
                      setSelectedDealerAddress("Select a dealer");
                      formik.setFieldValue("city", e.target.value);
                    }}
                    value={formik.values.city}
                    style={{ textTransform: "capitalize" }}
                  >
                    <option value="">Select</option>
                    {cities.map((city, index) => {
                      return (
                        <option
                          style={{ textTransform: "capitalize" }}
                          value={city}
                        >
                          {city}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg-6 col-md-6">
                  <label for="bike_name">
                    Available Dealers{" "}
                    <span className="d-none d-md-inline-block">
                      (Choose one):
                    </span>
                  </label>
                  {/* {console.log(formik.values)} */}
                  <select
                    required
                    id="dealer"
                    name="dealer_id"
                    onChange={(e) => {
                      let temp = e.target.value;
                      for (let index in dealers) {
                        if (dealers[index].id === parseInt(temp)) {
                          setSelectedDealerAddress(dealers[index].address);
                        }
                      }
                      formik.setFieldValue("dealer_id", temp);
                    }}
                    value={formik.values.dealer_id}
                    style={{ textTransform: "capitalize" }}
                    disabled={formik.values.city === "select"}
                  >
                    <option value="">Select</option>
                    {dealers.map((dealer, index) => {
                      if (
                        (dealer.city !== null) & (dealer.city !== undefined) &&
                        dealer.city.toLowerCase() === formik.values.city
                      ) {
                        return (
                          <option
                            style={{ textTransform: "capitalize" }}
                            value={dealer.id}
                          >
                            {dealer.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <input
                  disabled
                  className="mb-4"
                  type="text"
                  value={selectedDealerAddress}
                />
              </div>
              <div className="form-row form-group">
                <div className="col-lg-6 col-md-6">
                  <label for="preferred_date">Date:</label>
                  <input
                    placeholder="YYYY-MM-DD"
                    required
                    className="mb-4"
                    type="date"
                    name="preferred_date"
                    id="preferred_date"
                    style={{ textTransform: "uppercase" }}
                    min={todays_date}
                    onChange={formik.handleChange}
                    value={formik.values.preferred_date}
                  />
                </div>
                <div className="col-lg-6 col-md-6">
                  <label for="preferred_time">Time:</label>
                  <input
                    placeholder="HH-MM"
                    required
                    className="mb-4"
                    type="time"
                    name="preferred_time"
                    id="preferred_time"
                    onChange={formik.handleChange}
                    value={formik.values.preferred_time}
                  />
                </div>
              </div>
              <div className="form-group mb-5">
                <label for="bike_name">
                  Which bike would you like to test ride?
                </label>
                <select
                  required
                  id="bike_name"
                  name="bike_name"
                  onChange={formik.handleChange}
                  value={formik.values.bike_name}
                >
                  <option value="">Select</option>
                  <option value="t_rex">T-Rex</option>
                  <option value="emx">EMX</option>
                  <option value="doodle">Doodle</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-transparent border-0 d-flex align-items-center justify-content-center w-100"
              >
                <Button text="Book now" color="black" />
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TestRide;
