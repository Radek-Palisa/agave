import app from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import { Entry, PostEntryPayload, Tag } from './types';

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

    this.db.enablePersistence().catch(error => {
      console.log(error);
    });

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

  addEntry = async ({ date: _, ...payload }: PostEntryPayload) => {
    return this.getEntriesRef().add({
      ...payload,
      timestamp: app.firestore.Timestamp.now(),
    });
  };

  editEntry = async ({ date, id, ...payload }: Partial<Entry> & { id: string }) => {
    const updatePayload = {
      ...payload,
      ...(date ? { timestamp: app.firestore.Timestamp.fromDate(date) } : {}),
    };

    return this.getEntriesRef().doc(id).update(updatePayload);
  };

  deleteEntry = async (entryId: string) => {
    return this.getEntriesRef().doc(entryId).delete();
  };

  getEntries = async () => {
    return this.getEntriesRef()
      .orderBy('timestamp', 'desc')
      .get()
      .then(result => result.docs);
  };

  private getUserSettingsRef = () => {
    if (!this.auth?.currentUser?.uid) throw new Error('Unauthorized');

    return this.db.collection('users').doc(this.auth.currentUser.uid).collection('settings');
  };

  private getUserTagsRef = () => {
    if (!this.auth?.currentUser?.uid) throw new Error('Unauthorized');

    return this.db.collection('users').doc(this.auth.currentUser.uid).collection('tags');
  };

  getUserTags = (): Promise<Tag[]> => {
    return this.getUserTagsRef()
      .get()
      .then(res =>
        res.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Tag)
        )
      );
  };

  subscribeUserTags = (callback: (error: Error | null, data?: any) => void) => {
    return this.getUserTagsRef()
      .orderBy('timestamp', 'asc')
      .onSnapshot(res => {
        const data = res.docs.map(
          doc =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Tag)
        );
        callback(null, data);
      }, callback);
  };

  editUserTag = async ({ id, label }: Tag) => {
    return this.getUserTagsRef().doc(id).update({ label });
  };

  addUserTag = async () => {
    return this.getUserTagsRef()
      .add({
        timestamp: app.firestore.Timestamp.now(),
      })
      .then(docRef => docRef.id);
  };

  deleteUserTag = async (tagId: string) => {
    return this.getUserTagsRef().doc(tagId).delete();
  };
}

export default new Store();
