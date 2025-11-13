"use client";
import Image from 'next/image'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import style from '@/styles/payment.module.css'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/PaymentForm";
import { toast } from 'react-toastify';
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj';
import secureLocalStorage from 'react-secure-storage';
import Cookies from 'js-cookie';
import { setAccessToken } from '@/store/slices/AuthSlice';
const stripePromise = loadStripe(process.env.STRIPEKEY as string);

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();
  const { userDetails }: any = useSelector((state: RootState) => state.auth);
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  let clientDetails_2: any = {
    amount: 50
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (userDetails.username !== "Loading" && userDetails.email !== "Loading") {
      (async () => {
        const data = {
          amount: 50,
        };

        try {
          const response = await getAxiosWithToken({
            method: 'POST',
            url: 'payment/create-payment-intent',
            data: data,
          });

          if (response.success === true) {
            setClientSecret(response.clientSecret);
          }
        } catch (error) {
          // Handle error or dispatch error-related actions here
          toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
          console.log(error);
        }
      })();
    }
  }, [userDetails]);


  const elementsOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
    },
  };

  useEffect(() => {
    const payment_intent = searchParams.get('payment_intent')
    const payment_intent_client_secret = searchParams.get('payment_intent')
    const redirect_status = searchParams.get('redirect_status')
    const fetchData = async () => {
      if (payment_intent !== "" && payment_intent && payment_intent_client_secret !== "" && payment_intent_client_secret && redirect_status !== "" && redirect_status && redirect_status == "succeeded") {
        let data = {
          payment_status: redirect_status,
          payment_intent: payment_intent,
        }

        try {
          const response = await getAxiosWithToken({
            method: 'POST',
            url: 'payment/membership',
            data: data,
          });
          if (response.success === true) {
            toast.success(response.msg);
            Cookies.set('m', response.m);
            secureLocalStorage.setItem('access', response.t);
            await dispatch(setAccessToken(response.t));
            router.push(`${response.redirect}`)
          } else {
            toast.error(response.msg)
          }
        } catch (error) {
          // Handle error or dispatch error-related actions here
          toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);


  return (
    <main>
      <div className={style.container}>
      <div className={style.sc1} id="ssc1" >  
          <video autoPlay muted loop playsInline className={style.vidbg}>         
            <source src="/img/log.mp4" type="video/mp4"/>       
          </video>
          <div className={style.intro}>
            <h3>Creează Cont</h3>
            {clientSecret && (
              <Elements options={elementsOptions} stripe={stripePromise}>
                <CheckoutForm type={1} />
              </Elements>
            )}
            <Image width={200} height={200} src="/img/gym_banner.png" priority className={style.logo} alt="" />
            <p>pentru artisti &amp; producatori la inceput de drum</p>
          </div>
        </div>
      </div>
    </main>
  )
}
function dispatch(arg0: { payload: any; type: "auth/setAccessToken"; }) {
  throw new Error('Function not implemented.');
}

