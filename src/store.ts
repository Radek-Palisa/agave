import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { MonthEntries, PostEntryPayload } from './types';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

class Store {
  auth: app.auth.Auth;
  googleProvider: app.auth.GoogleAuthProvider;
  db: app.firestore.Firestore;

  constructor() {
    app.initializeApp(config);
    // app.analytics();

    this.auth = app.auth();
    this.db = app.firestore();

    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // signOut = () => this.auth.signOut();

  private getEntriesRef = () => {
    if (!this.auth?.currentUser?.uid) throw new Error('Unauthorized');

    return this.db.collection('users').doc(this.auth.currentUser.uid).collection('entries');
  };

  addEntry = async ({ text }: PostEntryPayload) => {
    return this.getEntriesRef().add({
      text,
      timestamp: firestore.Timestamp.now(),
    });
  };

  editEntry = async (payload: PostEntryPayload, entryId: string) => {
    return this.getEntriesRef().doc(entryId).update(payload);
  };

  getEntries = async () => {
    return this.getEntriesRef()
      .orderBy('timestamp', 'desc')
      .get()
      .then(docRef => {
        let yearMonthCount = '';
        let currentDay = 0;

        const data: MonthEntries = [];

        docRef.forEach(doc => {
          const item = doc.data();
          const date: Date = item.timestamp.toDate();
          const day = date.getDate();
          const year = date.getFullYear();
          const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

          const dataItem = {
            text: item.text,
            id: doc.id,
            date,
          };

          if (yearMonthCount === `${year}-${month}`) {
            const lastItem = data[data.length - 1];

            if (currentDay === day) {
              lastItem.days[lastItem.days.length - 1].entries.push(dataItem);
            } else {
              currentDay = day;
              lastItem.days.push({
                day,
                entries: [dataItem],
              });
            }
          } else {
            yearMonthCount = `${year}-${month}`;
            currentDay = day;

            data.push({
              month,
              year,
              days: [
                {
                  day,
                  entries: [dataItem],
                },
              ],
            });
          }
        });

        return data;
      });
  };
}

export default new Store();
