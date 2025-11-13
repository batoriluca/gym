"use client"
import style from '@/styles/deposit.module.css'
import Navbar from '@/components/navbar'
import Userlist from '@/components/Userlist';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Statusbar from '@/components/statusbar'
import { Elements } from "@stripe/react-stripe-js";
import Deposit from "@/components/DepositFrom";
import { toast } from 'react-toastify';
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj';
// import Userlist from '@/components/userlist';
const stripePromise = loadStripe(process.env.STRIPEKEY as string);

export default function Home() {

  const { userDetails }: any = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...',
    profilepic: 'astist.png',
  });

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  const [clientSecret, setClientSecret] = useState("");

  // const [taxAmount, setTaxAmount]: any = useState(0);
  const [Amount, setAmount]: any = useState(0);
  const [getAmount, setGetAmount]: any = useState(49);

  const handleAmount = (e: any) => {
    if (e.target.name = "amount") {
      let getAmount2 = e.target.value;
      setGetAmount(getAmount2)
      let getTax = (getAmount2 * 8) / 100;
      getAmount2 = getAmount2 - getTax;
      setAmount(getAmount2)
      // setTaxAmount(getTax)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      // Create PaymentIntent as soon as the page loads
      if (user.username !== "Loading..." && user.email !== "Loading...") {
        if (getAmount! >= 50) {
          if (getAmount! <= 5000) {
            const data = {
              amount: getAmount,
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
          } else {
            toast.error("Suma ar trebui să fie mai mare de 50 RON");
          }
        }
      }
    };

    fetchData(); // Immediately call the async function
  }, [userDetails, user, getAmount]);

  const router = useRouter();
  const searchParams = useSearchParams();

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
            url: 'payment/add',
            data: data,
          });
          if (response.success === true) {
            toast.success(response.msg);
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

  const elementsOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
    },
  };

  return (
    <main>
      <div id="sc1" className={style.sc1} style={{backgroundImage: 'url(/img/bh3.png)', backgroundSize: '300px 600px', backgroundRepeat:'repeat'}}>
      <div className={style.shadoww}></div>
          <div className={style.shadoww2}></div>
          <div className={style.bgbh} style={{backgroundImage: 'url(/img/dark.png)', backgroundSize: 'cover'}}></div>
          <div className={style.carousel}>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
            <img src="/img/muzic.png" alt="" className={style.bgimg}/>
          </div>
          
        <div className={style.main_container} >
          <div className={style.navbar_contanier}>
            <Navbar />
          </div>
          <div className={style.content_contanier}>
            {/* Status Bar */}
            <Statusbar />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.deposit_card}>


                  <div className={`${style.checkoutt} ${style.forch}`} >
                    
                      <h1>Depozitare</h1>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Suma de depozitare"
                        onChange={handleAmount}
                      />

                     {/*  {Amount !== 0 ? (<h3>Vei primi: {Amount} RON </h3>) : (null)}*/}
                      <h6>Suma minimă de depozitare este de 50RON</h6>
                      {/*<p>ATENȚIE! Comisionul per tranzacție este de 8%! </p>*/}
                    </div>
                    {getAmount >= 50 ? (<div className={style.checkoutt}>
                      {clientSecret && (
                        <Elements options={elementsOptions} stripe={stripePromise}>
                          <Deposit />
                        </Elements>
                      )}</div>) : (null)}
                  </div>
                </div>
              </div>
              {/* User list starts */}
               <Userlist /> 
              {/* User list ends */}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
