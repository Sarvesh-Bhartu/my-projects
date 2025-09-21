import * as admin from 'firebase-admin';

// Server-side (Admin) Firebase app
if (typeof window === 'undefined' && admin.apps.length === 0) {
    try {
      admin.initializeApp();
    } catch (e) {
      console.log('re-initializing admin', e)
    }
}
const adminDb = typeof window === 'undefined' ? admin.firestore() : null;

export { adminDb };
