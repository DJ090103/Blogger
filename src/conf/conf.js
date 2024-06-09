const prefix = import.meta.env;

const conf = {
  appwriteUrl: String(prefix.VITE_APPWRITE_URL),
  appwriteProjectId: String(prefix.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(prefix.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(prefix.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(prefix.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
