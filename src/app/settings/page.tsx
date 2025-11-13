"use client"
import style from '@/styles/settings.module.css'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Statusbar from '@/components/statusbar'
import { useFormik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import { AppDispatch } from '@/store/store';
import { getAxiosWithToken } from '@/axios/AxiosObj';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserProfile, getUserWallet } from '@/function/user'
import { getRefreshToken } from '@/function/auth'
import { userLogOut } from '@/store/slices/AuthSlice';

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();
  const [wallet, setWallet]: any = useState()

  const [messagee, setMessagee] = useState('')

  const updateWallet = async () => {
    const wallet = await getUserWallet();
    if (wallet.success) {
      setWallet(wallet.data[0])
    } else {
      setWallet({
        wallet: "Loading...",
        lockamount: "Loading...",
      })
    }
  }

  useEffect(() => {
    updateWallet();
  }, []);

  const initialValues = {
    currentpassword: "",
    newpassword: "",
    comfirmpassword: "",
  }

  const setupSchema = Yup.object({
    currentpassword: Yup.string().min(6, "Trebuie să conțină cel puțin 6 caractere").required("Te rugăm să introduci parola actuală"),
    newpassword: Yup.string().min(6, "Trebuie să conțină cel puțin 6 caractere").required("Te rugăm să introduci parola nouă"),
    comfirmpassword: Yup.string().min(6, "Trebuie să conțină cel puțin 6 caractere").required("Te rugăm să confirmi parola nouă").oneOf([Yup.ref("newpassword")], "Both password must be match"),
  })

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialValues,
    validationSchema: setupSchema,

    onSubmit: async (values, action) => {

      const currentpassword = values.currentpassword;
      const newpassword = values.newpassword;
      const comfirmpassword = values.comfirmpassword;

      const data = { currentpassword, newpassword, comfirmpassword };

      try {
        const response = await getAxiosWithToken({
          method: 'PATCH',
          url: 'auth/password',
          data: data,
        });
        if (response.success === true) {
          toast.success(response.msg);
          action.resetForm();
        } else {
          toast.error(response.msg)
        }
      } catch (error) {
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
      }
    }
  })

  // give value to var
  const handleChangee = (e: any) => {
    if (e.target.name = "messagee") {
      setMessagee(e.target.value);
    }
  }

  const sendMessage = async () => {

    if (messagee !== "") {

      const message = messagee
      const data = { message }
      try {
        const response = await getAxiosWithToken({
          method: 'POST',
          url: 'mail/send',
          data: data,
        });
        if (response.success === true) {
          toast.success(response.msg);
          setMessagee('')
        } else {
          toast.error(response.msg)
        }
      } catch (error) {
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
      }
    } else {
      toast.error("Vă rugăm să încărcați mesajul");
    }
  }

  useEffect(() => {
    // Call getRefreshToken initially
    getRefreshToken();

    // Set up the interval to call getRefreshToken every 9 minutes
    const intervalId = setInterval(() => {
      getRefreshToken();
    }, 9 * 60 * 1000); // 9 minutes in milliseconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [deleteModel, setDeleteModel] = useState(false);
  const [logOutModel, setLogOuModel] = useState(false);

  // const router = useRouter();
  const logOutModell = () => {
    if (logOutModel == true) {
      setLogOuModel(false)
    } else {
      setLogOuModel(true)
    }
    setDeleteModel(false)
  }

  const logout = async () => {
    await dispatch(userLogOut())
  }

  const deleteAccount = () => {
    if (deleteModel == true) {
      setDeleteModel(false)
    } else {
      setDeleteModel(true)
    }
    setLogOuModel(false)
  }

  const confirmDelete = async () => {
    const deleteStatus = await deleteUserProfile()
    // if (deleteStatus.success == true) {
    //   await toast.success(deleteStatus.msg)

    // } else {
    //   toast.error(deleteStatus.msg);
    // }
    console.log(deleteStatus)
  }

  const cancelModel = () => {
    setDeleteModel(false)
    setLogOuModel(false)
  }

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
            <Statusbar action={true} />
            {/* Status Bar */}
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <div className={style.l_side}>
                    <div className={`${style.card} ${style.change_pw}`} >
                    
                      <form onSubmit={handleSubmit}>
                        <h1 className={style.card_title}>Schimbă parola</h1>
                        <input
                          type="password"
                          id="currentpassword"
                          placeholder="Parola veche"
                          name='currentpassword'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.currentpassword || ""}
                        />
                        {errors.currentpassword && touched.currentpassword ? <p className={style.from_error}>{errors.currentpassword}</p> : null}
                        <input
                          type="password"
                          id="newpassword"
                          placeholder="Parola nouă"
                          name='newpassword'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newpassword || ""}
                        />
                        {errors.newpassword && touched.newpassword ? <p className={style.from_error}>{errors.newpassword}</p> : null}
                        <input
                          type="password"
                          id="comfirmpassword"
                          placeholder="Parola nouă"
                          name='comfirmpassword'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.comfirmpassword || ""}
                        />
                        {errors.comfirmpassword && touched.comfirmpassword ? <p className={style.from_error}>{errors.comfirmpassword}</p> : null}
                        <input
                          type="submit"
                          defaultValue="Schimbă"
                        />
                      </form>
                    </div>
                    <div className={`${style.wallet} ${style.card}`} >
                      <h1 className={style.card_title}>Portofel</h1>
                      <div className={style.srow}>
                        <div className={style.totalbalance}>
                          <h3>Balanţa totală:</h3>
                          <h2>{Math.ceil(parseFloat(wallet?.amount))} RON</h2>
                          <div className={`${style.box} ${style.show}`}>
                            <h3>Balanţa &quot;blocată&quot;: </h3>
                            <h2>{Math.ceil(parseFloat(wallet?.lockamount))} RON</h2>
                          </div>
                        </div>
                        <div className={style.actions}>
                          <Link href="withdraw">
                            <button>Retragere</button>
                          </Link>
                          <Link href="deposit">
                            <button>Depozitează</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className={`${style.contact_form} ${style.card}`} >
                      <h1 className={style.card_title}>Contact</h1>
                      <textarea
                        onChange={handleChangee}
                        value={messagee || ""}
                        name='messagee'
                        id='messagee'
                        cols={30}
                        rows={10}
                        placeholder="Scrie mesajul"
                      />
                      <br />
                      <div style={{ display: "flex" }}>
                        <p style={{ color: "#A4A4A4" }}>sau</p>
                        <Link
                          style={{ color: "#6c5ce7", marginLeft: 5, textDecoration: "underline" }}
                          href="mailto:growyourmusic.official@gmail.com"
                        >
                          <p>trimite mail aici</p>
                        </Link>
                      </div>
                      <input type="submit" defaultValue="Trimite" onClick={sendMessage} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.profile_bar}>
                <div className={`${style.card} ${style.faq}`} >
                  <h1 className={style.card_title}>FAQ</h1>
                  <div className={style.q1}>
                    <h2>1. Cum se pot face bani folosind GrowYourMusic?</h2>
                    <p>
                      Vânzarea a cât mai multor produse sau serviciul de a cânta pe piesele altora sunt plătite în funcție de calitatea acestora, cu cât sunt mai calitative serviciile și produsele cu atât mai mulți utilizatori le vor cumpăra!
                    </p>
                  </div>
                  <div className={style.q1}>
                    <h2>2. Cum pot să dezactivez abonamentul cu plată?</h2>
                    <p>
                      Abonamentul se poate dezactiva de la pagina de setări, butonul &quot;Dezabonare&quot;.
                    </p>
                  </div>
                  <div className={style.q1}>
                    <h2>3. Ce se întâmplă dacă plata abonamentului nu se proceseaza?</h2>
                    <p>
                      Dacă plata nu se poate finaliza, se va mai incerca procesarea plății în fiecare zi timp de 3 zile. Contul urmând să fie dezactivat în cazul neplății.
                    </p>
                  </div>
                  <div className={style.q1}>
                    <h2>4. Ce este Sezonul GrowYourMusic?</h2>
                    <p>
                      Perioada de timp în care utilizatorii colaborează și evoluează în lupta pentru primele locuri. La finalul sezonului clasamentele vor fi resetate.
                    </p>
                  </div>
                  <div className={style.q1}>
                    <h2>5. Vor mai exista și alte beneficii pentru utilizatorii GrowYourMusic în afară de premii?</h2>
                    <p>
                      Da, pe parcursul Sezonului GrowYourMusic utilizatorii platformei pot fi aleși să participe în diferite challenge-uri, promovari, etc. pe YouTube și Instagram.
                    </p>
                  </div>
                  <div className={style.q1}>
                    <h2>6. Când se vor acorda premiile clasamentelor?</h2>
                    <p>
                      Premiile se vor acorda pe parcursul sezonului actual GrowYourMusic și pe parcursul următorului.
                    </p>
                  </div>

                </div>
                <div className={style.r_side}>
                  <div className={style.delete_acc}>
                    <button id="logout" onClick={logOutModell}>Deconectare</button>
                    <button id="delacc" onClick={deleteAccount}>Dezabonare</button>
                  </div>
                  {logOutModel ?
                    (<div id="sureLogOut" className={style.warningcard} style={{backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover'}}>
                      <h2>ATENȚIE</h2>
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      <h6>Ești sigur că vrei să te deconectezi?</h6>
                      <div className="srowOp">
                        <button onClick={logout}>Sunt sigur!</button>
                        <button id='backlog' onClick={cancelModel}>Înapoi</button>
                      </div>
                    </div>) : (null)}

                  {deleteModel ?
                    (<div id="sureDeleteAcc" className={style.warningcard} style={{backgroundImage: 'url(/img/cardshv2.png)', backgroundSize: 'cover'}}>
                      <h2>ATENȚIE</h2>
                      <i className="fa-solid fa-triangle-exclamation"></i>
                      <h6>Ești sigur că vrei să te dezabonezi?</h6>
                      <p>Dezabonarea, implicit și inactivitatea dvs. pe platformă pentru o perioadă îndelungată de timp v-ar putea afecta poziționarea în clasamentele GrowYourMusic!</p>
                      <div className="srowOp">
                        <button onClick={confirmDelete}>Sunt sigur!</button>
                        <button id='backdel' onClick={cancelModel}>Înapoi</button>
                      </div>
                    </div>) : (null)}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  )
}
