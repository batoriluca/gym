"use client"
import Head from 'next/head'
import style from '@/styles/newproduct.module.css'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Statusbar from '@/components/statusbar'
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import router from 'next/navigation'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation'
import { getAxiosWithToken } from '@/axios/AxiosObj'
import secureLocalStorage from 'react-secure-storage'

export default function Home(props: any) {
  const { userDetails }: any = useSelector((state: RootState) => state.auth);

  const [user, setUser] = useState({
    username: 'Loading...',
    email: 'Loading...',
    profilepic: 'astist.png',
  });

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  const initialValues = {
    productTitle: "",
    productCategory: "",
    productPrice: "",
    productDescription: "",
  }

  // Product Img 1
  const [productimg1, setProductImg1] = useState('');
  const [imgurl1, setImgUrl1] = useState('');
  // Product Img 2
  const [productimg2, setProductImg2] = useState('');
  const [imgurl2, setImgUrl2] = useState('');
  // Product Video
  const [productVideo, setProductVideo] = useState('');
  const [videourl, setVideoUrl] = useState('');

  // Set 1
  const handleMediaChange = (event: any) => {
    const { name } = event.target;
    // First Image
    if (event.target.name == "imgInput") {
      if (event.target.files[0]) {
        const selectedImage = event.target.files[0];
        // Check if the file size is less than or equal to 2MB (2097152 bytes)
        if (selectedImage.size <= 2097152) {
          // Check if the file type is an image (jpeg, jpg, or png)
          if (selectedImage.type.includes('image/jpeg') || selectedImage.type.includes('image/jpg') || selectedImage.type.includes('image/png')) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setProductImg1(selectedImage);
            setImgUrl1(imageUrl);
          } else {
            toast.error("Only jpeg, jpg and png images are allowed");
          }
        } else {
          toast.error("Image size should be less than 2 MB");
        }
      }
    }

    // Second Image
    if (name == "imgInput2") {
      if (event.target.files[0]) {
        const selectedImage = event.target.files[0];
        // Check if the file size is less than or equal to 2MB (2097152 bytes)
        if (selectedImage.size <= 2097152) {
          // Check if the file type is an image (jpeg, jpg, or png)
          if (selectedImage.type.includes('image/jpeg') || selectedImage.type.includes('image/jpg') || selectedImage.type.includes('image/png')) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setProductImg2(selectedImage);
            setImgUrl2(imageUrl);
          } else {
            toast.error("Only jpeg, jpg and png images are allowed");
          }
        } else {
          toast.error("Image size should be less than 2 MB");
        }
      }
    }
    if (name == "videoInput") {
      if (event.target.files[0]) {
        const selectedImage = event.target.files[0];
        // Check if the file size is less than or equal to 2MB (2097152 bytes)
        if (selectedImage.size <= 94371840) {
          // Check if the file type is an image (jpeg, jpg, or png)
          if (selectedImage.type.includes('video')) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setProductVideo(selectedImage);
            setVideoUrl(imageUrl);
          } else {
            toast.error("Only Video is allowed");
          }
        } else {
          toast.error("Video size should be less than 90 MB");
        }
      }
    }

  }

  const setupSchema = Yup.object({
    productTitle: Yup.string().min(6, "Trebuie să aibă cel puțin 6 caractere").required("Vă rugăm să introduceți titlul produsului"),
    productCategory: Yup.string().required("Vă rugăm să alegeți categoria produsului"),
    productPrice: Yup.number().required("Vă rugăm să introduceți prețul produsului"),
    productDescription: Yup.string().min(30, "Trebuie să aibă cel puțin 30 caractere").required("Vă rugăm să introduceți descrierea produsului"),
  })

  // Upload image 1 in the file 
  const uploadMedia = async (media: any) => {
    if (media && media !== '') {
      const data = new FormData();
      data.append('media', media);
      try {
        const response: any = await fetch(`${process.env.API_URL}/product/media`, {
          method: 'POST',
          body: data,
          headers: {
            Authorization: 'Bearer ' + secureLocalStorage.getItem('access'),
          },
        })
        // console.log(response)
        const responseData = await response.json();
        if (responseData.success = true) {
          return responseData.fileName
        } else {
          toast.error("Vă rugăm să încercați din nou!");
          return false;
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
        return false;
      }
    } else {
      toast.error("Vă rugăm să selectați mai întâi imaginea");
      return false;
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialValues,
    validationSchema: setupSchema,

    onSubmit: async (values, action) => {

      let image1 = null;
      let image2 = null;
      let video = null;
      if (productimg1 == "" && productimg2 == "" && productVideo == "") {
        toast.error("Vă rugăm să încărcați o imagine");
      }

      if (productimg1 !== "") {
        const imgUpload1 = await uploadMedia(productimg1);
        image1 = imgUpload1;
      }
      if (productimg2 !== "") {
        const imgUpload2 = await uploadMedia(productimg2);
        image2 = imgUpload2;
      }
      if (productVideo !== "") {
        const videoUpload = await uploadMedia(productVideo);
        video = videoUpload;
      }

      const productTitle = values.productTitle;
      const productCategory = values.productCategory;
      const productPrice = values.productPrice;
      const productDescription = values.productDescription;

      const data = {
        "title": productTitle,
        "category": productCategory,
        "price": productPrice,
        "description": productDescription,
        "image1": image1,
        "image2": image2,
        "video": video,
      };

      try {
        const response = await getAxiosWithToken({
          method: 'POST',
          url: 'product',
          data: data,
        });
        if (response.success === true) {
          toast.success(response.msg);
          // router.push(`/shop`)
        } else {
          toast.error(response.msg)
        }
      } catch (error) {
        // Handle error or dispatch error-related actions here
        toast.error("Ceva n-a mers bine. Vă rugăm să încercați din nou");
        console.log(error);
      }
    }
  })

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
            <Statusbar />
            <div className={style.feed_with_user}>
              <div className={style.feed_posts}>
                <div className={style.dm}>
                  <Link href="shop">
                    <i className="fa-solid fa-assrrow-left-long back" />
                  </Link>
                  <div className={style.product} id="postCreate">
                    <i className="fa-solid fa-arrow-left-long aoleu" id="arrowLeft" />
                    <div id="img_part" className={style.img_part}>

                      <div className={style.img1}>
                        <input
                          type="file"
                          name="imgInput"
                          id="fileInputImg"
                          onChange={handleMediaChange}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                        <label htmlFor="fileInputImg">
                          <h3>Încarcă o Imagine</h3>
                          <i className="fa-solid fa-circle-plus" />
                        </label>
                        <div className={style.image}>
                          {imgurl1 == '' ? null : <Image width={200} height={200} src={imgurl1} alt="" id="imgP" />}
                        </div>
                      </div>
                      <div className={style.img2}>
                        <input
                          type="file"
                          name="imgInput2"
                          id="fileInputImg2"
                          onChange={handleMediaChange}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                        <label htmlFor="fileInputImg2">
                          <h3>Încarcă o Imagine (opțional)</h3>
                          <i className="fa-solid fa-circle-plus" />
                        </label>
                        <div className={style.image2}>
                          {imgurl2 == '' ? null : <Image width={200} height={200} src={imgurl2} alt="" id="imgP2" />}
                        </div>
                      </div>
                      <div className={style.vid1}>
                        <input
                          type="file"
                          name="videoInput"
                          id="fileInput3"
                          onChange={handleMediaChange}
                          accept="video/mp4,video/x-m4v,video/*"
                        />
                        <label htmlFor="fileInput3">
                          <h3>Încarcă un Video (opțional)</h3>
                          <i className="fa-solid fa-circle-plus" />
                        </label>
                        <video
                          preload="auto"
                          controlsList="nodownload"
                          disablePictureInPicture={true}
                          className={style.fixed_aspect_ratio}
                          id="videoP"
                        >
                          <source id="source" />
                        </video>
                      </div>

                    </div>
                    <i className="fa-solid fa-arrow-right-long" id="arrowRight" />
                  </div>
                </div>
              </div>
              <div className={style.profile_bar} >
                <form onSubmit={handleSubmit} autoComplete='false'>
                <div className={style.prodinput} style={{backgroundColor: '#00000046', border: 'solid 1px #6657da7d'}}>
                <div className={style.ch}></div>
                    <h3>Titlul produsului:</h3>
                    <input
                      type="text"
                      placeholder="Titlul produsului"
                      id="productTitle"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.productTitle || ""}
                      name='productTitle'
                    />
                    {errors.productTitle && touched.productTitle ? <p className={style.from_error}>{errors.productTitle}</p> : null}
                  </div>
                  <div className={style.prodinput} style={{backgroundColor: '#00000046', border: 'solid 1px #6657da7d'}}>
                  <div className={style.ch}></div>
                    <h3>Preţul produsului:</h3>
                    <input
                      type="number"
                      placeholder="Preţul produsului"
                      id="productPrice"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.productPrice || ""}
                      name='productPrice'
                    />
                    {errors.productPrice && touched.productPrice ? <p className={style.from_error}>{errors.productPrice}</p> : null}
                  </div>
                  <div className={style.prodinput} style={{backgroundColor: '#00000046', border: 'solid 1px #6657da7d'}}>
                  <div className={style.ch}></div>
                    <h3>Categoria produsului:</h3>
                    <select
                      defaultValue={"None"}
                      id="productCategory"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.productCategory || ""}
                      name='productCategory'
                    >
                      <option value="None" >Alege o categorie</option>
                      <option value="Beats">Beat</option>
                      <option value="visual">Visual/Artwork</option>
                      <option value="mixmas">Mix Master</option>
                      <option value="musicvid">Music Video Edit</option>
                      <option value="other">Altceva</option>
                    </select>
                    {errors.productCategory && touched.productCategory ? <p className={style.from_error}>{errors.productCategory}</p> : null}
                  </div>
                  <div className={style.prodinput} style={{backgroundColor: '#00000046', border: 'solid 1px #6657da7d'}}>
                  <div className={style.ch}></div>
                    <h3>Descrierea produsului:</h3>
                    <textarea
                      name="productDescription"
                      id="productDescription"
                      cols={30}
                      rows={10}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.productDescription || ""}
                      placeholder="Descrierea produsului"
                      defaultValue={""}
                    />
                    {errors.productDescription && touched.productDescription ? <p className={style.from_error}>{errors.productDescription}</p> : null}
                  </div>
                  <div className={style.prodinput} style={{padding: '0'}}>
                    <input type="submit" value="Creează produsul" />
                  </div>
                </form>
              </div>
            </div> 
            
          </div>
        </div>
      </div>
      <script src="/js/newproduct.js"></script>
    </main>
  )
}