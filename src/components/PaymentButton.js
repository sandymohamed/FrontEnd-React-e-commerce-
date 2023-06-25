import {
  PayPalScriptProvider,
  PayPalButtons
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentResult, selectError, selectLoading } from "../redux/reducers/orderSlice";
import { selectTotal, selectTotalQuantity } from "../redux/reducers/cartSlice";
import { useNavigate } from "react-router-dom";

const ID = "AcdIue6OSWJoAFIRAmsyu4fkXqYSqY7VtLOuaGqfxq2yRrczxaDMXKLT8KGpP5D2-2_Rh-xVV54Eg3lj"




const PaymentButton = () => {




  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalQuantity = useSelector(selectTotalQuantity);
  const total = useSelector(selectTotal);


  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState({});
  const [data, setdata] = useState({});




  const [alertVariant, setAlertVariant] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const showMessage = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
  };

  const createOrder = (data, actions) => {
    console.log('createeeeee');
    if (total > 0) {

      return actions.order.create({
          purchase_units: [
            {
              amount: {
                // charge users $499 per order
                value: total,
                // description: `${totalQuantity} items from ShopIn store`
              },
            },
          ],
          // remove the applicaiton_context object if you need your users to add a shipping address
          application_context: {
            shipping_preference: "NO_SHIPPING",

          },
        })
        .then((orderID) => {
          setOrderID(orderID);
          setdata(data);
          console.log("create", orderID);

          // navigate('/orders')
          return orderID;
        }).catch(err => console.log(err))
    } else {
      return showMessage('❌You have to order some products first', 'danger')
    }
  };

  // const onApprove = (data, actions) => {
  //   navigate('/orders')
  //   console.log('aproove data: ', data,'actions: ', actions);
    
  //   return actions.order.capture().then(function (details) {
  //     console.log('aproovessssssssss', details);

  //     const { payer } = details;
  //     setBillingDetails(payer);
  //     setSucceeded(true);

  //     dispatch(addPaymentResult(payer).then((res) => {
  //       showMessage('Profile Updated Successfully✔', 'warning')
  //       console.log("capture", res);

  //     }).catch((error) => {

  //       showMessage('error❌', error, 'danger')

  //     }))


  //   }).catch(err => {
  //     setPaypalErrorMessage("Something went wrong.")
  //     showMessage('error❌', err, 'danger')

  //   })
  // }

  const onApprove = (data, actions) => {
    navigate('/orders');

    return actions.order.capture()
      .then(function (details) {
  
        const { payer } = details;
        setBillingDetails(payer);
        setSucceeded(true);
  
        
        return dispatch(addPaymentResult(payer))
          .then((res) => {
            showMessage('Profile Updated Successfully✔', 'warning');
            console.log("capture", res);
          })
          .catch((error) => {
            showMessage('error❌', error, 'danger');
          });
      })
     
      .catch(err => {
        setPaypalErrorMessage("Something went wrong.");
        showMessage('error❌', err, 'danger');
      });
  };
  
  
  useEffect(() => {

    console.log('lol');
    console.log('err', paypalErrorMessage);
    console.log('orderID', orderID);
    console.log('billingDetails', billingDetails);

  }, [paypalErrorMessage, orderID, billingDetails])

  return (
    <PayPalScriptProvider
      options={{ "client-id": ID }}>
      <PayPalButtons

        createOrder={createOrder}
        onApprove={onApprove}
      />

    </PayPalScriptProvider>

  )
}

export default PaymentButton