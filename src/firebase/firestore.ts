import { collection, addDoc, getDocs, query, where, Timestamp, doc, getDocFromServer } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './config';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error Details:', {
    ...errInfo,
    databaseId: db.type === 'firestore' ? (db as any)._databaseId?.database : 'unknown'
  });
  throw new Error(JSON.stringify(errInfo));
}

// Validation connection on boot
const testConnection = async () => {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
};
testConnection();

export const STORIES_COLLECTION = 'stories';
export const CONTRIBUTIONS_COLLECTION = 'contributions';

export interface Story {
  id?: string;
  title: string;
  content: string;
  image?: string;
  state: string;
  author?: string;
  createdAt: any;
  category: string;
}

export const getStories = async (stateFilter?: string) => {
  try {
    const storiesRef = collection(db, STORIES_COLLECTION);
    const q = stateFilter 
      ? query(storiesRef, where('state', '==', stateFilter))
      : storiesRef;
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Story));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, STORIES_COLLECTION);
    return [];
  }
};

export const submitContribution = async (data: Omit<Story, 'id' | 'createdAt'>, imageFile?: File) => {
  try {
    let imageUrl = '';
    if (imageFile) {
      const storageRef = ref(storage, `${CONTRIBUTIONS_COLLECTION}/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, CONTRIBUTIONS_COLLECTION), {
      ...data,
      image: imageUrl || data.image || '',
      createdAt: Timestamp.now(),
      author: auth.currentUser?.email || 'Anonymous',
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contribution:", error);
    throw error;
  }
};
