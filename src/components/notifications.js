import mongoose from 'mongoose';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const URI = process.env.MONGO_URI;
(async () => {
  try {
    // await mongoose.connect(URI, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // });
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
})();

const Notifi = () => {
  const [connected, setConnected] = useState(false);

  const setupChangeStream = async () => {
    const db = await mongoose.connection;

    if (!db) {
      return;
    }

    db.on('error', (error) => {
      console.error(error);
    });

    db.once('open', () => {
      console.log('Connected to database');
    });

    const myCollection = db.collection('notifications');
    const changeStream = myCollection.watch([
      {
        $match: { "username": "demo" },
      },
    ]);

    changeStream.on('change', (change) => {

      if (typeof window !== 'undefined' && Notification.permission === "granted") {
        Notification.requestPermission().then(async function (permission) {
          if (permission === "granted") {
            await new Notification("Notification", {
              body: change.fullDocument.message,
              icon: '/img/logogym.png',
            });
          } else {
            await new Notification("Notification", {
              body: change.fullDocument.message,
              icon: '/img/logogym.png',
            });
          }
        })
      }

      toast.success("change.fullDocument.message", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log('Change detected:', change);

      if (change.operationType === 'insert') {
        console.log("Message:", change.fullDocument.message);
      }

      // return change.fullDocument.message;
    });
  };

  useEffect(() => {
    setupChangeStream();
  }, []);

  // useEffect(() => {
  // if (typeof window !== 'undefined') {
  //   if ("Notification" in window && Notification.permission !== "granted") {
  //     Notification.requestPermission().then(async function (permission) {
  //       if (permission === "granted") {
  //         await new Notification("Notification", {
  //           body: "Notifications are now enabled",
  //           icon: '/img/logogym.png',
  //         });
  //       } else {
  //         await new Notification("Notification", {
  //           body: "change.fullDocument.message",
  //           icon: '/img/logogym.png',
  //         });
  //       }
  //     });
  //   }
  // }
  if (typeof window !== 'undefined') {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            new Notification("Notification", {
              body: "Notifications are now enabled",
              icon: '/img/logogym.png',
            });
          }
        });
      } else {
        new Notification("Notification", {
          body: "Notifications are now enabled",
          icon: '/img/logogym.png',
        });
      }
    }
  }
  // }, []);

  return (null);
};

export default Notifi;
