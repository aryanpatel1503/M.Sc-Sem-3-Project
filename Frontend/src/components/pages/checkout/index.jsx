import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../app/Layout";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Select, Option, Radio } from "@material-tailwind/react";
import { API_URL } from "../../lib/constant";
import { toast } from "react-toastify";
import { getFormattedDate } from "../../lib/commonFunctions";

const Checkout = () => {
  const [productData, setProductData] = useState({});
  const [userData, setUserData] = useState({});
  const [selectedValue, setSelectedValue] = useState("current");
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const defaultValues = {
    order_name: "",
    order_address: "",
    order_city: "",
    order_state: "",
    order_mobile: "",
    order_email: "",
    order_pincode: "",
    order_status: "pending",
    shipping_method: "cash on delivery",
    product_id: state?.id,
    user_id: user_id,
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const formValues = watch();

  const setCurrentAddress = (response) => {
    response = response || userData;
    reset((formValues) => ({
      ...formValues,
      order_name: response.user_fullname,
      order_address: response.current_address,
      order_state: response.current_state,
      order_city: response.current_city,
      order_mobile: response.user_mobile,
      order_email: response.user_email,
      order_pincode: response.current_pincode,
    }));
  };

  const setPermanentAddress = () => {
    reset((formValues) => ({
      ...formValues,
      order_name: userData.user_fullname,
      order_address: userData.permanent_address,
      order_state: userData.permanent_state,
      order_city: userData.permanent_city,
      order_mobile: userData.user_mobile,
      order_email: userData.user_email,
      order_pincode: userData.permanent_pincode,
    }));
  };

  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/orders/add`, {
        ...values,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message || "Order added Successfully", {
            position: "top-center",
          });
          navigate("/products/laptop");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      });
  };

  const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products/${state?.id}`);
    setProductData(response.data.result[0]);
  };

  const getUser = async () => {
    const response = await axios.get(`${API_URL}/users/${user_id}`);
    const responseData = response.data.result[0];
    setUserData(responseData);
    setCurrentAddress(responseData);
  };

  useEffect(() => {
    if (state?.id) {
      getProducts();
    }
    if (user_id) {
      getUser();
    }
  }, []);

  const onSubmitError = (error) => {
    Object.values(error).forEach((item, index) => {
      if (index === 0) {
        toast.error(item.message, {
          position: "top-center",
        });
      }
    });
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (user_id) {
      handleSubmit(onSubmit, onSubmitError)();
    } else {
      navigate("/login");
    }
  };

  const handleCancelOrder = () => {
    navigate(-1);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    if (value === "permanent") {
      setPermanentAddress();
    } else {
      setCurrentAddress();
    }
    setSelectedValue(event.target.value);
  };

  return (
    <Layout>
      <div className="my-10">
        <form onSubmit={handleConfirmOrder} className="max-w-4xl mx-auto my-8">
          <h2 className="text-3xl font-medium text-center">Checkout</h2>
          <hr className="my-8 border-[1.3px] border-gray-300" />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <h2 className="text-xl font-semibold">
              Date: {getFormattedDate()}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <img
                src={productData.product_img}
                alt="product image"
                className="mr-4 w-28"
              />
            </div>
            <div className="flex items-center">
              <h3 className="text-xl font-semibold">
                {productData.product_name}
              </h3>
            </div>
            <div className="flex items-center justify-end">
              <p className="text-xl">₹{productData.product_price}</p>
            </div>
          </div>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold">Shipping Information</h2>

          <div className="flex gap-10 my-4">
            <Radio
              name="type"
              value="current"
              label="Same as Current address"
              defaultChecked
              onChange={handleRadioChange}
            />
            <Radio
              name="type"
              value="permanent"
              label="Same as Permanent address"
              onChange={handleRadioChange}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Controller
              name="order_name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Ship to name"
                  error={errors.name && errors.name.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="order_address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Address"
                  error={errors.address && errors.address.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="order_state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="State"
                  error={errors.state && errors.state.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="order_city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="City"
                  error={errors.city && errors.city.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="order_mobile"
              control={control}
              rules={{
                required: "Mobile number is required",
                maxLength: {
                  value: 10,
                  message: "Mobile number must be 10 digits",
                },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    "Invalid mobile number. It must contain only digits.",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Mobile No."
                  error={errors.mobile && errors.mobile.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="order_email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Email"
                  error={errors.email && errors.email.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="order_pincode"
              control={control}
              rules={{
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Pincode must contain only digits",
                },
                minLength: {
                  value: 6,
                  message: "Pincode must be exactly 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "Pincode must be exactly 6 digits",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Pincode"
                  error={errors.pincode && errors.pincode.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="shipping_method"
              control={control}
              rules={{ required: "Payment method is required" }}
              render={({ field }) => (
                <Select
                  label="Payment method"
                  error={errors.paymentMethod && errors.paymentMethod.message}
                  {...field}
                >
                  <Option value="cash on delivery">Cash on delivery</Option>
                </Select>
              )}
            />
          </div>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold mb-4">Payment Info</h2>
          <p className="text-green-600 font-semibold mb-6">Cash On Delivery</p>

          <hr className="my-8 border-[1.3px] border-gray-300" />
          <h2 className="text-2xl font-bold">Billing Info</h2>
          <div className="space-y-4 w-4/12 mt-4 mb-10">
            <div className="flex justify-between text-lg">
              <p className="text-green-600 font-semibold">Subtotal</p>
              <p className="text-green-600 font-semibold">
                ₹{productData.product_price}
              </p>
            </div>
            <div className="flex justify-between text-lg">
              <p className="text-green-600 font-semibold">Delivery Charges</p>
              <p className="text-green-600 font-semibold">₹0.00</p>
            </div>
            <hr className="border-[1.3px] border-gray-300" />
            <div className="flex justify-between text-xl">
              <p className="text-green-600 font-semibold">Total Payable</p>
              <p className="text-green-600 font-semibold">
                ₹{productData.product_price}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outlined"
              size="md"
              className="text-red-600 border-red-600"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
            <Button type="submit" size="md" className="bg-teal-500">
              Confirm Order
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
