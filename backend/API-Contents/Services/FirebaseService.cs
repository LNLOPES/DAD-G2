using Firebase.Auth;
using Firebase.Storage;
namespace API_Contents.Services
{
    public interface IFirebaseService
    {
        public Task<string> uploadFile(string? fileDir, string fileName, Stream fileStream);
    }
    public class FirebaseService : IFirebaseService
    {
        private string firebaseApiToken;
        private string firebaseEmail;
        private string firebasePassword;
        public FirebaseService(IConfiguration configuration)
        {
            this.firebaseApiToken = configuration["FirebaseAuth:ApiToken"];
            this.firebaseEmail = configuration["FirebaseAuth:Email"];
            this.firebasePassword = configuration["FirebaseAuth:Password"];
        }
        public async Task<string> uploadFile(string? fileDir, string fileName, Stream fileStream)
        {
            FirebaseAuthProvider authProvider = new FirebaseAuthProvider(new FirebaseConfig(this.firebaseApiToken));
            FirebaseAuthLink authentication = await authProvider.SignInWithEmailAndPasswordAsync(this.firebaseEmail, this.firebasePassword);
            FirebaseStorageOptions firebaseStorageOptions = new FirebaseStorageOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(authentication.FirebaseToken),
                ThrowOnCancel = true,
            };

            FirebaseStorage firebaseStorage = new FirebaseStorage("api-contents.appspot.com", firebaseStorageOptions);
            FirebaseStorageReference firebaseStorageReference = this.getFirebaseStorageDir(firebaseStorage, fileDir, fileName);

            string fileUrl = await firebaseStorageReference.PutAsync(fileStream);

            return fileUrl;
        }

        public FirebaseStorageReference getFirebaseStorageDir(FirebaseStorage firebaseStorage, string? fileDir, string fileName)
        {
            FirebaseStorageReference firebaseStorageReference;

            if (fileDir != null)
            {
                List<string> fileDirFolders = fileDir.Split('/').ToList<string>();

                firebaseStorageReference = firebaseStorage.Child(fileDirFolders[0]);

                fileDirFolders.RemoveAt(0);

                foreach (string folder in fileDirFolders)
                {
                    firebaseStorageReference = firebaseStorageReference.Child(folder);
                }

                firebaseStorageReference = firebaseStorageReference.Child(fileName);
            } else {
                firebaseStorageReference = firebaseStorage.Child(fileName);
            }

            return firebaseStorageReference;
        }
    }
}
